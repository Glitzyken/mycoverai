import {
  IsString,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(56)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  @MinLength(2)
  cca2: string;

  @IsString()
  @IsNotEmpty()
  capital: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  flag: string;

  @IsBoolean()
  @IsNotEmpty()
  isLiveData: boolean;
}
