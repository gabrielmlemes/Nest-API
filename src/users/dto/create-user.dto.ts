import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(30, { message: 'O nome não pode ter mais de 30 caracteres' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  readonly name: string;

  @IsString({ message: 'O email deve ser uma string' })
  @IsEmail()
  @IsNotEmpty({ message: 'O email é obrigatório' })
  readonly email: string;

  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  readonly password: string;
}
