import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createCountry(createCountryDto: CreateCountryDto, { isTest }) {
    createCountryDto.isTest = isTest;
    const country = this.countryRepository.create(createCountryDto);
    await this.countryRepository.save(country);
    return country;
  }

  async findAllCountries({ isTest }) {
    const countries = await this.countryRepository.find({ where: { isTest } });
    return countries;
  }

  async findOneCountry(id: number) {
    const country = await this.countryRepository.findOne({ where: { id } });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return country;
  }

  async updateCountry(id: number, updateCountryDto: UpdateCountryDto) {
    await this.findOneCountry(id); // Checks if record exists

    await this.countryRepository.update(id, updateCountryDto);
    const updatedPost = await this.findOneCountry(id);

    return updatedPost;
  }

  async removeCountry(id: number) {
    const deleteResponse = await this.countryRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException('Country not found');
    }
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
