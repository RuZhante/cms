import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponseInteface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  buildResponse(user: UserEntity): UserResponseInteface {
    return { user };
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ id: id });
  }
}
