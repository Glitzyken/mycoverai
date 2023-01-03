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
  async createCountry(@Body() createCountryDto: CreateCountryDto) {
    const country = await this.countryService.createCountry(createCountryDto);

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
  async findAllCountries() {
    const countries = await this.countryService.findAllCountries();

    return {
      message: `ALL ${countries.length} COUNTRIES`,
      result: { count: countries.length, countries },
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(+id);
  }
}
