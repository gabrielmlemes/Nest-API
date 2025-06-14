// Classe abstrata apenas para servir como um TIPO
export abstract class HashingServiceProtocol {
  abstract hash(passowrd: string): Promise<string>;

  abstract compare(password: string, hashedPassword: string): Promise<boolean>; //os parâmetros que ele espera são: a senha informada pelo usuário e a senha do banco de dados
}
