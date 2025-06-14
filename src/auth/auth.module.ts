import { Global, Module } from '@nestjs/common';
import { BcryptService } from './hash/bcrypt.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global() // Pode ser usado em qualquer lugar do app, não precisa importar em nenhum outro módulo além do app module
@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BcryptService,
    },
    AuthService,
  ],
  exports: [HashingServiceProtocol],
  controllers: [AuthController],
})
export class AuthModule {}
