import { UserEntity } from '@common/server';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { JwtPayload, JwtTokens } from './auth.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async validateUser({
    email,
    password,
  }: LoginDto): Promise<UserEntity | null> {
    const user = await this.userService.findOneUserByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  createTokens({ userId, type }: JwtPayload): JwtTokens {
    return {
      accessToken: this.jwtService.sign({ userId, type }, { expiresIn: '1h' }),
      refreshToken: this.getRefreshToken(),
    };
  }

  // TODO: refresh token process
  validateRefreshToken(refreshToken: string): boolean {
    if (
      !this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('SECRET_KEY', 'keyboard_cat'),
      })
    ) {
      return false;
    }
    return true;
  }

  // TODO: refresh token process
  private getRefreshToken(): string {
    return this.jwtService.sign(
      {},
      {
        secret: this.configService.get<string>('SECRET_KEY', 'keyboard_cat'),
        expiresIn: '7d',
      },
    );
  }
}
