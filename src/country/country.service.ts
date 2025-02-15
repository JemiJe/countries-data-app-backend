import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadGatewayException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import {
  AvailableCountries,
  CountryInfo,
  CountryPopulation,
  CountryFlag,
} from './country.types';

@Injectable()
export class CountryService {
  private readonly apiDateNager: string;
  private readonly apiCountriesnow: string;

  constructor(private configService: ConfigService) {
    this.apiDateNager =
      this.configService.get<string>('API_DATE_NAGER') || 'undefined_api';
    this.apiCountriesnow =
      this.configService.get<string>('API_COUNTRIESNOW') || 'undefined_api';
  }

  async getAvailableCountries() {
    const url = `${this.apiDateNager}/AvailableCountries`;

    try {
      const response: { data: AvailableCountries } = await axios.get(url);
      return response.data;
    } catch (error) {
      this.handleAxiosError(
        error as AxiosError,
        'Fetching available countries failed',
      );
    }
  }

  async getCountryInfo(countryCode: string) {
    const url = `${this.apiDateNager}/CountryInfo/${countryCode}`;

    try {
      const response: { data: CountryInfo } = await axios.get(url);
      return response.data;
    } catch (error) {
      this.handleAxiosError(
        error as AxiosError,
        `Fetching country info for ${countryCode} failed`,
      );
    }
  }

  async getPopulationData() {
    const url = `${this.apiCountriesnow}/countries/population`;

    try {
      const response: { data: CountryPopulation } = await axios.get(url);
      return response.data;
    } catch (error) {
      this.handleAxiosError(
        error as AxiosError,
        `Fetching countries population failed`,
      );
    }
  }

  async getCountriesFlag() {
    const url = `${this.apiCountriesnow}/countries/flag/images`;

    try {
      const response: { data: CountryFlag } = await axios.get(url);
      return response.data;
    } catch (error) {
      this.handleAxiosError(
        error as AxiosError,
        `Fetching countries flags failed`,
      );
    }
  }

  private handleAxiosError(error: AxiosError, message: string) {
    if (error.response) {
      const { status } = error.response;

      if (status === 404) {
        throw new NotFoundException(`${message}: Not Found`);
      }

      throw new BadGatewayException(`${message}: External API error`);
    } else if (error.request) {
      throw new BadGatewayException(
        `${message}: No response from external API`,
      );
    } else {
      throw new InternalServerErrorException(`${message}: ${error.message}`);
    }
  }
}
