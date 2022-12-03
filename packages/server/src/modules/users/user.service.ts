import { UserEntity } from '@common/server';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreatedUserDto } from './dto/created-user.dto';
import { UpdatedUserDto } from './dto/updated-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createdUser({
    email,
    username,
    password,
    type,
  }: CreatedUserDto): Promise<UserEntity> {
    const hasUser = await this.userRepository.findOneBy({ email });
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

  async updatedOneUser(
    id: number,
    { password, username, type }: UpdatedUserDto,
  ): Promise<UserEntity> {
    const hasUser = await this.userRepository.findOneBy({ id });
    if (hasUser) {
      throw new BadRequestException('None exists user.');
    }

    hasUser.password = password;
    hasUser.username = username;
    hasUser.type = type;
    hasUser.updatedAt = new Date();

    await this.userRepository.save(hasUser);
    return hasUser;
  }

  async deletedOneUser(id: number): Promise<UserEntity> {
    const hasUser = await this.userRepository.findOneBy({ id });
    if (hasUser) {
      throw new BadRequestException('None exists user.');
    }

    const deletedUser = await this.userRepository.remove(hasUser);
    return deletedUser;
  }
}
