import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private readonly httpServer: HttpService) {}
  async getCurrentWeather(city: string): Promise<any> {
    const encodedCity = encodeURIComponent(city);
    const key = `251518e073ef6c3c9504dd286c3f6a86`; // 替换为你的 API 密钥
    const url2 = `https://apis.juhe.cn/simpleWeather/query?city=${encodedCity}&key=${key}`;
    try {
      const response = await firstValueFrom(this.httpServer.get(url2));
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Could not fetch weather data',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
