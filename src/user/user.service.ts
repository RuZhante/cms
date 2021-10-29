import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInteface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import { sign } from 'jsonwebtoken';
import { SECRET } from 'src/config';
import { UpdateUserDto } from './dto/updateUser.dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (userByEmail) {
      throw new HttpException(
        'Email are taken!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async loginUser(loginUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      { select: ['id', 'email', 'password'] },
    );

    if (!user) {
      throw new HttpException(
        'Email does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const validPassword = await compare(loginUserDto.password, user.password);

    if (!validPassword) {
      throw new HttpException(
        'Password is not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;
    return user;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: updateUserDto.email,
    });

    if (!userByEmail) {
      throw new HttpException(
        'Email does not exist!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = await this.userRepository.findOne(
      { id: userId },
      { select: ['id', 'email', 'password'] },
    );

    user.password = hash(updateUserDto.password, 10);
    return await this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<DeleteResult> {
    return await this.userRepository.delete({ id: userId });
  }

  buildResponse(user: UserEntity): UserResponseInteface {
    return {
      user: {
        ...user,
        token: this.generateJwtToken(user),
      },
    };
  }

  generateJwtToken(user: UserEntity): string {
    return sign({ id: user.id, email: user.email }, SECRET);
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ id });
  }
}
