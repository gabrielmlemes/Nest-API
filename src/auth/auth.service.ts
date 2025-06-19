import { LoginDto } from './dto/loginDto';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async login(LoginDto: LoginDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: LoginDto.email,
        },
      });

      if (!user) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.UNAUTHORIZED,
        ); // 401
      }

      const isPassowrdCorrect = await this.hashingService.compare(
        LoginDto.password,
        user.password,
      );

      if (!isPassowrdCorrect) {
        throw new HttpException(
          'Senha/Login incorreto(a)',
          HttpStatus.BAD_REQUEST,
        ); // 400
      }

      const token = this.jwtService.sign(
        // payload do usuário
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        // configurações do JWT
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          expiresIn: this.jwtConfiguration.jwtTtl,
        },
      );

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      };
    } catch (error) {
      throw new HttpException('Senha/Login incorreto(a)', HttpStatus.NOT_FOUND); // 404
      console.log(error);
    }
  }
}
