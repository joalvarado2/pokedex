import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({}); // este metodo elimina toda ld DB es solo de prueba

    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; numero: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const numero = +segments[segments.length - 2];

      pokemonToInsert.push({ name, numero });
      //const pokemon = await this.pokemonModel.create({name , numero});
    });
    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed Execute';
  }
}
