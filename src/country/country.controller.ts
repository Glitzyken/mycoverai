import { ExtendedRequest } from './../shared/interface/request.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { TransformResponseInterceptor } from '../shared/interceptors/response.interceptor';

@Controller('countries')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(TransformResponseInterceptor)
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  async createCountry(
    @Req() req: ExtendedRequest,
    @Body() createCountryDto: CreateCountryDto,
  ) {
    const country = await this.countryService.createCountry(
      createCountryDto,
      req,
    );

    return {
      message: 'COUNTRY CREATED',
      result: country,
    };
  }

  @Post('seed')
  seedDB() {
    this.countryService.seedDB();
    return {
      message: 'DONE',
    };
  }

  @Get()
  async findAllCountries(@Req() req: ExtendedRequest) {
    const countries = await this.countryService.findAllCountries(req);

    return {
      message: `ALL ${countries.length} COUNTRIES`,
      result: { count: countries.length, countries },
    };
  }

  @Get(':id')
  async findOneCountry(@Param('id') id: string) {
    const country = await this.countryService.findOneCountry(+id);

    return {
      message: `DONE`,
      result: country,
    };
  }

  @Patch(':id')
  async updateCountry(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    const country = await this.countryService.updateCountry(
      +id,
      updateCountryDto,
    );

    return {
      message: `UPDATED`,
      result: country,
    };
  }

  @Delete(':id')
  async removeCountry(@Param('id') id: string) {
    await this.countryService.removeCountry(+id);

    return {
      message: `DONE`,
    };
  }
}
