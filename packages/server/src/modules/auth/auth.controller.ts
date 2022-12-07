import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtTokens } from './auth.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtGuard } from './guard/jwt.guard';
import { LocalGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Body() { email, password }: LoginDto): Promise<JwtTokens> {
    const user = await this.authService.validateUser({ email, password });
    return await this.authService.createTokens({
      userId: user.id,
      type: user.type,
    });
  }

  // TODO: access 토큰이 만료됬으니, refresh token을 통해 user 정보 가져오는 법이 필요
  // @Post('/refresh-token')
  // async refrehToken(
  //   @Body() { refreshToken }: RefreshTokenDto,
  // ): Promise<JwtTokens> {
  //   if (this.authService.validateRefreshToken(refreshToken)) {
  //     throw new UnauthorizedException('Invalid refresh token.');
  //   }
  //   return await this.authService.createTokens({});
  // }

  // @UseGuards(JwtGuard)
  // @Get('me')
  // async getLoggedInUser() {}
}
