import { UserEntity } from '@common/server';
import { RoleEnum } from '@common/server/src/constants/enums';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

export interface createUser {
  email: string;
  username: string;
  password: string;
  type: RoleEnum;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser({
    email,
    username,
    password,
    type,
  }: createUser): Promise<UserEntity> {
    const hasUser = await this.userRepository.findOneByOrFail({ email });
    if (hasUser) {
      throw new BadRequestException('None exists user.');
    }

    const createdUser = await this.userRepository.save({
      email,
      username,
      password,
      type,
    });

    return createdUser;
  }

  async findAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findUsers(
    options: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity[]> {
    const users = await this.userRepository.findBy(options);
    return users;
  }

  async findOneUserById(id: number): Promise<UserEntity> {
    const hasUser = await this.userRepository.findOneBy({ id });
    if (hasUser) {
      throw new BadRequestException('None exists user.');
    }

    return hasUser;
  }

  async updateOneUser(
    id,
    { email, password, username, type },
  ): Promise<UserEntity> {
    const hasUser = await this.userRepository.findOneBy({ id });
    if (hasUser) {
      throw new BadRequestException('None exists user.');
    }

    hasUser.email = email;
    hasUser.password = password;
    hasUser.username = username;
    hasUser.type = type;
    hasUser.updatedAt = new Date();

    await this.userRepository.save(hasUser);
    return hasUser;
  }

  async deleteOneUser(id): Promise<UserEntity> {
    const hasUser = await this.userRepository.findOneBy({ id });
    if (hasUser) {
      throw new BadRequestException('None exists user.');
    }

    const deletedUser = await this.userRepository.remove(hasUser);
    return deletedUser;
  }
}
