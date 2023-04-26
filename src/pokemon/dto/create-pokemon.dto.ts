import { IsIn, isPositive, MinLength, IsString, Min } from 'class-validator';

export class CreatePokemonDto {
  //  @IsIn()
  //  @isPositive()
  @Min(1)
  numero: number;

  @IsString()
  @MinLength(1)
  name: string;
}
