import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdButtonModule, MdExpansionModule, MdProgressBarModule, MdPaginatorModule } from '@angular/material';

import { AppComponent } from './components/app.component';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';

import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';
import { WeatherService } from './services/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherWidgetComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdButtonModule,
    MdExpansionModule,
    MdProgressBarModule,
    MdPaginatorModule
  ],
  providers: [
    ApiService,
    StorageService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
