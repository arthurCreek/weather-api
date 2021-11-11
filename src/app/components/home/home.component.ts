import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Weather } from 'src/app/model/weather';
import { WeatherService } from 'src/app/services/weather.service';
import * as utils from '../../utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formGroup: FormGroup;
  currentWeather: Weather = new Weather;
  currentWeatherLoaded = false;

  constructor(private weatherService: WeatherService) {
    this.formGroup = new FormGroup({
      zipcode: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.weatherService.getCurrentForecast().subscribe(res => {
      if(res != null) {
        this.updateCurrentTemp(res);
      } else {
        this.currentWeatherLoaded = false;
      }
    });
  }

  updateCurrentTemp(res: any) {
    this.currentWeather = utils.createCurrentWeather(res);
    this.currentWeatherLoaded = true;
  }

}
