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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteResult } from 'typeorm';
import { User } from '../common/decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponseInteface } from './types/userResponse.interface';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // @UsePipes(new ValidationPipe())
  // async createUser(
  //   @Body() createUserDto: CreateUserDto,
  // ): Promise<UserResponseInteface> {
  //   const newUser = await this.userService.createUser(createUserDto);
  //   return this.userService.buildResponse(newUser);
  // }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserResponseInteface> {
    const user = await this.userService.findById(userId);
    return this.userService.buildResponse(user);
  }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Put(':userId')
  // @UsePipes(new ValidationPipe())
  // async updateUser(
  //   @User('id') userId: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<UserResponseInteface> {
  //   const user = await this.userService.updateUser(userId, updateUserDto);
  //   return this.userService.buildResponse(user);
  // }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Delete(':userId')
  // async deleteUser(@User('id') userId: number): Promise<DeleteResult> {
  //   return await this.userService.deleteUser(userId);
  // }
}
