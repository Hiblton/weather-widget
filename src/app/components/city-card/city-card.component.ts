import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnInit {

  @Input() city = {};
  @Output() onAddCity = new EventEmitter<number>();
  @Output() onRemoveCity = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  addCity(id: number) {
    this.onAddCity.emit(id);
  }

  removeCity(city: any) {
    this.onRemoveCity.emit(city);
  }

}
