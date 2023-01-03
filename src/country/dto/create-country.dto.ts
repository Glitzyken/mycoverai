import { IsString, MaxLength, IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(56)
  name: string;

  @IsString()
  @IsNotEmpty()
  capital: string;

  @IsEmpty()
  isTest: boolean;
}
