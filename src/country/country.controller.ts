import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('available')
  getAvailableCountries() {
    return this.countryService.getAvailableCountries();
  }

  @Get('info/:countryCode')
  getCountryInfo(@Param('countryCode') countryCode: string) {
    return this.countryService.getCountryInfo(countryCode);
  }

  @Get('population')
  getPopulationData() {
    return this.countryService.getPopulationData();
  }

  @Get('flags')
  getCountriesFlag() {
    return this.countryService.getCountriesFlag();
  }
}
