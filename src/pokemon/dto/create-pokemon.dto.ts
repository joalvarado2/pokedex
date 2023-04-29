import {  IsPositive, MinLength, IsString, Min, IsInt } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  numero: number;

  @IsString()
  @MinLength(1)
  name: string;
}
