// O que é o DTO: Data Transfer Object (objeto de transferência de dados) é um objeto que contém apenas os dados necessários para realizar uma operação.

export class CreateTaskDto {
  readonly name: string;
  readonly description: string;
}
