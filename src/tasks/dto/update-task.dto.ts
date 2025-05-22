/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsBoolean, IsOptional } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

// export class UpdateTaskDto {
//   @IsString()
//   @IsOptional()
//   @IsNotEmpty()
//   readonly name?: string;

//   @IsString()
//   @IsOptional()
//   @IsNotEmpty()
//   readonly description?: string;

//   @IsBoolean()
//   @IsOptional()
//   readonly completed?: boolean;
// }

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;
}

// Para não precisar de um DTO separado, podemos usar o @PartialType do @nestjs/mapped-types para criar um DTO baseado em outro. Isso permite que você crie um DTO que herda de outro DTO e adicione ou remova propriedades. No entanto, é importante notar que o @PartialType não é uma validação, ele apenas cria um novo DTO com as propriedades que você especificou. Para validar os dados, você precisa usar a validação de propriedades do TypeScript.
