import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async findAllUsers() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return users;
    } catch (error) {
      throw new HttpException('Internal error', HttpStatus.BAD_REQUEST); // 500
      console.log(error);
    }
  }

  async findOneUser(id: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: +id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          tasks: true,
        },
      });

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND); // 404

      return user;
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND); // 404
      console.log(error);
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      if (
        !createUserDto.name ||
        !createUserDto.email ||
        !createUserDto.password
      ) {
        throw new HttpException(
          'Missing required fields',
          HttpStatus.BAD_REQUEST,
        ); // 400
      }

      const emailAlreadyExists = await this.prisma.user.findFirst({
        where: {
          email: createUserDto.email,
        },
      });

      if (emailAlreadyExists) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST); // 400
      }

      const hashedPassword = await this.hashingService.hash(
        createUserDto.password,
      );

      const newUser = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return newUser;
    } catch (error) {
      throw new HttpException('Internal error', HttpStatus.BAD_REQUEST); // 500
      console.log(error);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: {
          id: +id,
        },
      });

      if (!findUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND); // 404
      }

      const userData: { name?: string; password?: string } = {
        name: updateUserDto.name ?? findUser.name,
      };

      if (updateUserDto.password) {
        const hashedPassword = await this.hashingService.hash(
          updateUserDto.password,
        );
        userData.password = hashedPassword;
      }

      const updateUser = await this.prisma.user.update({
        where: {
          id: findUser.id,
        },
        data: {
          name: userData.name,
          password: userData.password ?? findUser.password,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return updateUser;
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST); // 404
      console.log(error);
    }
  }

  async deleteUser(id: string) {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: {
          id: +id,
        },
      });

      if (!findUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND); // 404
      }

      const user = await this.prisma.user.delete({
        where: {
          id: findUser.id,
        },
      });

      return { message: 'User deleted', user };
    } catch (error) {
      throw new HttpException(error + 'Internal error', HttpStatus.BAD_REQUEST); // 500
    }
  }
}
