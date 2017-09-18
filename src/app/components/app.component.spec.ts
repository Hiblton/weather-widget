import { TestBed, async } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdInputModule, MdButtonModule, MdExpansionModule, MdProgressBarModule, MdPaginatorModule } from '@angular/material';

import { AppComponent } from './app.component';
import { WeatherWidgetComponent } from "./weather-widget/weather-widget.component";
import { StorageService } from './../services/storage.service';
import { WeatherService } from './../services/weather.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, ReactiveFormsModule,
        MdInputModule, MdButtonModule, MdExpansionModule, MdProgressBarModule, MdPaginatorModule
      ],
      declarations: [
        AppComponent,
        WeatherWidgetComponent
      ],
      providers: [
        {provide: StorageService, useValue: {}},
        {provide: WeatherService, useValue: {}}
      ]
    }).compileComponents().then(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
