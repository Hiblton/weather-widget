import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdInputModule, MdButtonModule, MdExpansionModule, MdProgressBarModule, MdPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { WeatherWidgetComponent } from './weather-widget.component';
import { CityCardComponent } from '../city-card/city-card.component';
import { StorageService } from './../../services/storage.service';
import { WeatherService } from './../../services/weather.service';
import { ApiService } from './../../services/api.service';

describe('WeatherWidgetComponent', () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, ReactiveFormsModule,
        MdInputModule, MdButtonModule, MdExpansionModule, MdProgressBarModule, MdPaginatorModule,
        BrowserAnimationsModule, NoopAnimationsModule
      ],
      declarations: [
        WeatherWidgetComponent,
        CityCardComponent
      ],
      providers: [
        StorageService,
        //WeatherService,
        //ApiService
        //{provide: StorageService, useValue: {}},
        {provide: WeatherService, useValue: {}},
        {provide: ApiService, useValue: {}}
      ]
    })
      .compileComponents().then(() => {
      const fixture = TestBed.createComponent(WeatherWidgetComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
