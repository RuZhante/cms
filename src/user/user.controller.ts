import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponseInteface } from './types/userResponse.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInteface> {
    const newUser = await this.userService.createUser(createUserDto);
    return this.userService.buildResponse(newUser);
  }

  @Get(':userId')
  async getUserById(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserResponseInteface> {
    const user = await this.userService.findById(userId);
    return this.userService.buildResponse(user);
  }

  @Post('login')
  async loginUser(
    @Body() loginUserDto: CreateUserDto,
  ): Promise<UserResponseInteface> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildResponse(user);
  }

  @Put()
  async updateUser(
    @User('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInteface> {
    const user = await this.userService.updateUser(userId, updateUserDto);
    return this.userService.buildResponse(user);
  }

  @Delete()
  async deleteUser(@User('id') userId: number): Promise<DeleteResult> {
    return await this.userService.deleteUser(userId);
  }
}
