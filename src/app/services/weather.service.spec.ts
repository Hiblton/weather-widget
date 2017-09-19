import { TestBed, inject } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { ApiService } from './api.service';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        {provide: ApiService, useValue: {}}
      ]
    });
  });

  it('should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));
});
