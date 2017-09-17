import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { StorageService } from '../../services/storage.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {

  private searchForm: FormGroup;
  private searchField: FormControl;
  private requesting: boolean = false;
  private pageIndex: number = 0;
  private pageSize: number = 5;

  private location: any = {};
  private cities: Array<any> = [];
  private displayedCities: Array<any> = [];

  constructor(private storageService: StorageService,
              private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.createForm();
    this.getSavedData();
    this.getLocalWeather();
    //todo subscribe on cities array
    //todo handlers: duplicate ids of city, city is not found, display validation errors
  }

  createForm() {
    this.searchForm = new FormGroup({
      searchField: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  getSavedData() {
    this.cities = this.storageService.get('cities') || [];
    if (this.cities && this.cities.length) {
      this.cities.map(item => {
        this.weatherService.getWeatherByCityID(item.id).subscribe(
          response => {
            item = response;
            item.saved = true;
            return item;
          }
        )
      });
      this.storageService.set('cities', this.cities);
      this.updateDisplayedCities();
    }
  }

  onSubmitSearchForm() {
    if (this.searchForm.valid) {
      this.requesting = true;
      this.weatherService.getWeatherByCityName(this.searchForm.value.searchField).subscribe(
        response => {
          this.requesting = false;
          this.cities.unshift(response);
          this.updateDisplayedCities();
          this.searchForm.reset();
        },
        error => {
          this.requesting = false;
          console.warn(`ERROR(${error.cod}): ${error.message}`);
        }
      );
    }
  }

  addCity(city: any) {
    city.saved = true;
    let cities = this.cities.filter(item => item.saved);
    this.storageService.set('cities', cities);
    this.updateDisplayedCities();
  }

  removeCity(id: number) {
    this.cities = this.cities.filter(item => item.id !== id);
    let cities = this.cities.filter(item => item.saved);
    this.storageService.set('cities', cities);
    this.updateDisplayedCities();
  }

  getLocalWeather() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.weatherService.getWeatherByCoords(pos.coords.latitude, pos.coords.longitude).subscribe(
          response => {
            this.location = response;
          }
        )
      }, err => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }, {timeout: 5000});
  }

  onPaginateChange(event) {
    this.pageIndex = event.pageIndex;
    this.updateDisplayedCities();
  }

  updateDisplayedCities() {
    let startIndex = this.pageIndex * this.pageSize;
    let endIndex = this.pageIndex * this.pageSize + this.pageSize;
    this.displayedCities = this.cities.slice(startIndex, endIndex);
  }

}
