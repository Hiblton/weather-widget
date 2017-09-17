import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../services/api.service';

const OPEN_WEATHER_MAP_API: string = 'https://api.openweathermap.org/data/2.5/weather';
const OPEN_WEATHER_MAP_APP_ID: string = '41ddceb150d57569aea7b971aa3612dc';

@Injectable()
export class WeatherService {

  private query: any;

  constructor(private apiService: ApiService) {
    this.query = {
      appid: OPEN_WEATHER_MAP_APP_ID,
      units: 'metric'
    }
  }

  getWeatherByCityName(name: string): Observable<any> {
    let query = {
      ...this.query,
      q: name
    };
    return this.apiService.getMethod(OPEN_WEATHER_MAP_API, query);
  }

  getWeatherByCityID(id: string): Observable<any> {
    let query = {
      ...this.query,
      id: id
    };
    return this.apiService.getMethod(OPEN_WEATHER_MAP_API, query);
  }

  getWeatherByCoords(lat: number, lon: number): Observable<any> {
    let query = {
      ...this.query,
      lat: lat,
      lon: lon
    };
    return this.apiService.getMethod(OPEN_WEATHER_MAP_API, query);
  }

}
