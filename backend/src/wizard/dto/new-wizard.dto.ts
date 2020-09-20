import { IsDefined, IsNotEmpty, IsBoolean, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class NewWizard implements Readonly<NewWizard> {
  @IsDefined()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsDefined()
  age: number;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(3)
  specialty: string;

  @IsDefined()
  @IsBoolean()
  @Transform(value =>
    typeof value === 'string'
      ? ['true', '1', 'yes'].includes(value.toLowerCase())
      : Boolean(value),
  )
  is_active: boolean;
}