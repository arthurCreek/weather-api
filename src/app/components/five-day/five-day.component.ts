import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Weather, WeatherType } from 'src/app/model/weather';
import { WeatherService } from 'src/app/services/weather.service';
import * as utils from '../../utils/utils';

@Component({
  selector: 'app-five-day',
  templateUrl: './five-day.component.html',
  styleUrls: ['./five-day.component.css']
})
export class FiveDayComponent implements OnInit {
  formGroup: FormGroup;
  currentWeather: Weather[][] = [];
  currentWeatherLoaded = false;
  location: string = '';
  weatherType = WeatherType.FIVE_DAY;

  constructor(private weatherService: WeatherService) {
    this.formGroup = new FormGroup({
      zipcode: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.weatherService.getGetFiveDayForecast().subscribe(res => {
      if(res != null) {
        this.updateCurrentTemps(res);
      } else {
        this.currentWeatherLoaded = false;
      }
    });
  }
  updateCurrentTemps(res: any) {
    this.location = res.city.name + ', ' + res.city.country;
    this.currentWeather = utils.createFiveDayForecast(res);
    this.currentWeatherLoaded = true;
  }

}
