import { IsDefined, IsNotEmpty, MinLength, Validate } from 'class-validator';
import * as bcrypt from 'bcryptjs';

import { IsUserAlreadyExist } from '../user.validator';
import { User } from '../user.entity';

export class NewUser implements Readonly<NewUser> {
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @Validate(IsUserAlreadyExist)
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  public static async toEntity?(newUser: NewUser): Promise<User> {
    const salt = await bcrypt.genSalt();

    const it = new User();
    it.name = newUser.name;
    it.email = newUser.email;
    it.password = await bcrypt.hash(newUser.password, salt);
    it.created_at = new Date();
    it.updated_at = new Date();
    return it;
  }
}
