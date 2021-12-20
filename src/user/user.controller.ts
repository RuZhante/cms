import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserResponseInteface } from './types/userResponse.interface';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserResponseInteface> {
    const user = await this.userService.findById(userId);
    return this.userService.buildResponse(user);
  }
}
