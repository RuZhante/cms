import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserResponseInteface } from './types/userResponse.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInteface> {
    const newUser = await this.userService.createUser(createUserDto);
    return this.userService.buildResponse(newUser);
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  async getUserById(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserResponseInteface> {
    const user = await this.userService.findById(userId);
    return this.userService.buildResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body() loginUserDto: CreateUserDto,
  ): Promise<UserResponseInteface> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildResponse(user);
  }

  @Put(':userId')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateUser(
    @User('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInteface> {
    const user = await this.userService.updateUser(userId, updateUserDto);
    return this.userService.buildResponse(user);
  }

  @Delete(':userId')
  @UseGuards(AuthGuard)
  async deleteUser(@User('id') userId: number): Promise<DeleteResult> {
    return await this.userService.deleteUser(userId);
  }
}
