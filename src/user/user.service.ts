import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInteface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    // const userByEmail = await this.userRepository.findOne({
    //   email: createUserDto.email,
    // });

    // if (userByEmail) {
    //   throw new HttpException(
    //     'Email are taken!',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    // const userByEmail = await this.userRepository.findOne({
    //   email: updateUserDto.email,
    // });

    // if (!userByEmail) {
    //   throw new HttpException(
    //     'Email does not exist!',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }

    const user = await this.userRepository.findOne(
      { id: userId },
      { select: ['id', 'email', 'password'] },
    );

    user.password = await hash(updateUserDto.password, 10);
    return await this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<DeleteResult> {
    return await this.userRepository.delete({ id: userId });
  }

  buildResponse(user: UserEntity): UserResponseInteface {
    return { user };
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ id });
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ email: email });
  }
}
