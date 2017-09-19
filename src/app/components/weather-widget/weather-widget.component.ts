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

  private localCity: any = {};
  private cities: Array<any> = [];
  private displayedCities: Array<any> = [];

  constructor(private storageService: StorageService,
              private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.createForm();
    this.getSavedData();
    this.getLocalWeather();
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
        //update weather for all saved cities
        this.weatherService.getWeatherByCityID(item.id).subscribe(
          response => {
            item = response;
            item.saved = true;
            return item;
          }
        )
      });
      this.setSavedData();
      this.updateDisplayedCities();
    }
  }

  setSavedData() {
    let cities = this.cities.filter(item => item.saved);
    this.storageService.set('cities', cities);
  }

  onSubmitSearchForm() {
    if (this.searchForm.valid) {
      this.requesting = true;
      this.weatherService.getWeatherByCityName(this.searchForm.value.searchField).subscribe(
        response => {
          //prevent duplicate of cities: city is moving to beginning of list
          this.cities = this.cities.filter(item => item.id !== response.id);
          this.cities.unshift(response);

          this.requesting = false;
          this.searchForm.reset();
          this.updateDisplayedCities();
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
    this.setSavedData();
    this.updateDisplayedCities();
  }

  removeCity(id: number) {
    this.cities = this.cities.filter(item => item.id !== id);
    this.setSavedData();
    this.updateDisplayedCities();
  }

  getLocalWeather() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.weatherService.getWeatherByCoords(pos.coords.latitude, pos.coords.longitude).subscribe(
          response => {
            this.localCity = response;
            this.localCity.local = true;
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
    //to prevent empty page
    if (endIndex > this.pageSize && endIndex > this.cities.length) {
      this.pageIndex--;
      this.updateDisplayedCities();
    }
    this.displayedCities = this.cities.slice(startIndex, endIndex);
  }

}
