// O que é o DTO: Data Transfer Object (objeto de transferência de dados) é um objeto que contém apenas os dados necessários para realizar uma operação.

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(5, { message: 'O nome deve ter no mínimo 5 caracteres' })
  @MaxLength(30, { message: 'O nome não pode ter mais de 30 caracteres' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  readonly name: string;

  @IsString({ message: 'A descrição deve ser uma string' })
  @MinLength(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
  @MaxLength(100, {
    message: 'A descrição não pode ter mais de 100 caracteres',
  })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O id do usuário é obrigatório' })
  readonly userId: number;
}
