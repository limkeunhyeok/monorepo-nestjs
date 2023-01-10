import { UserEntity } from '@common/server';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatedUserDto } from './dto/created-user.dto';
import { UpdatedUserDto } from './dto/updated-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createdUser(@Body() dto: CreatedUserDto): Promise<UserEntity> {
    const user = await this.userService.createdUser(dto);
    return user;
  }

  @Get()
  async getUser(): Promise<UserEntity[]> {
    const users = await this.userService.findAllUsers();
    return users;
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<UserEntity> {
    const user = await this.userService.findOneUserById(userId);
    return user;
  }

  @Put('/:userId')
  async updatedUser(
    @Param('userId') userId: number,
    dto: UpdatedUserDto,
  ): Promise<UserEntity> {
    const user = await this.userService.updatedOneUser(userId, dto);
    return user;
  }

  @Delete('/:userId')
  async deletedUser(@Param('userId') userId: number): Promise<UserEntity> {
    const user = await this.userService.deletedOneUser(userId);
    return user;
  }
}
