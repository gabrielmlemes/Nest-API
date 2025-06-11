import { HashingServiceProtocol } from './hashing.service';
import * as bcrypt from 'bcryptjs';

export class BcryptService extends HashingServiceProtocol {
  async hash(passowrd: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(passowrd, salt);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
