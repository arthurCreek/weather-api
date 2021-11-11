import { Component, Input, OnInit } from '@angular/core';
import { Weather, WeatherType } from 'src/app/model/weather';

@Component({
  selector: 'app-temp-card',
  templateUrl: './temp-card.component.html',
  styleUrls: ['./temp-card.component.css']
})
export class TempCardComponent implements OnInit {

  @Input() currentWeather!: Weather;
  @Input() weatherType!: WeatherType;

  dateTimeString = '';


  constructor() {

   }

  ngOnInit(): void {
    if(this.weatherType === WeatherType.CURRENT) {
      this.dateTimeString = this.currentWeather.date + ' | ' + this.currentWeather.time;
    } else {
      this.dateTimeString = this.currentWeather.time;
    }
  }

}
