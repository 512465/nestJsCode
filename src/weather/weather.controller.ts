import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getCurrentWeather(@Query('city') city: string) {
    if (!city) {
      throw new Error('City is required');
    }
    const weather = await this.weatherService.getCurrentWeather(city);
    return weather;
  }
}
