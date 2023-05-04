import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExeption(error);
    }
  }

  findAll(paginationDto: PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;
    
    return this.pokemonModel.find()
    .limit(limit)
    .skip( offset)  // metodos propios de mongoose
    .sort({
      numero: 1
    })
    .select('-__v');
  }

  async findOne(idTerm: string) {
    let pokemon: Pokemon;
    if (!isNaN(+idTerm))
      pokemon = await this.pokemonModel.findOne({ numero: idTerm });

    // MongoId
    if (isValidObjectId(idTerm))
      pokemon = await this.pokemonModel.findById(idTerm);

    // name
    if (!pokemon)
      pokemon = await this.pokemonModel.findOne({
        name: idTerm.toLocaleLowerCase().trim(),
      });

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or numero "${idTerm}" no found`,
      );
    return pokemon;
  }

  async update(idTerm: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(idTerm);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

      try {
        await pokemon.updateOne(updatePokemonDto);
        return { ...pokemon.toJSON(), ...updatePokemonDto };
      } catch (error) {
        this.handleExeption(error);
      }
    }
  }

  async remove(id: string) {
    /* const pokemon = await this.findOne(id);
   await pokemon.deleteOne(); */

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found}`);
    }
    return;
  }

  private handleExeption(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon - check server logs`,
    );
  }
}
