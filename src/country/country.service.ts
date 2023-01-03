import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';

import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async createCountry(createCountryDto: CreateCountryDto) {
    const country = this.countryRepository.create(createCountryDto);
    await this.countryRepository.save(country);
    return country;
  }

  async findAllCountries() {
    const countries = await this.countryRepository.find();
    return countries;
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }

  seedDB() {
    fs.readFile('seed_data.json', 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const parsedData = JSON.parse(data);
      const countries = this.countryRepository.create(parsedData.countries);
      await this.countryRepository.save(countries);
    });
  }
}

/*
  const json = JSON.stringify({
    countries,
  });

  fs.writeFile('seed_data.json', json, 'utf8', () => {
    console.log('Successful! 🥳🥳🥳');
  });
*/
