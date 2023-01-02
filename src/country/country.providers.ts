import { DataSource } from 'typeorm';
import { Country } from './entities/country.entity';
import constants from './country.constants';

export const countryProviders = [
  {
    provide: constants.COUNTRY_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Country),
    inject: [constants.DATA_SOURCE],
  },
];
