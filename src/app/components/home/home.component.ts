import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Weather, WeatherType } from 'src/app/model/weather';
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
  weatherType = WeatherType.CURRENT;
  location: string = '';
  error = false;

  constructor(private weatherService: WeatherService) {
    this.formGroup = new FormGroup({
      zipcode: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.weatherService.getCurrentForecast().subscribe(res => {
      if(res != null) {
        this.updateCurrentTemp(res);
      } else {
        this.currentWeatherLoaded = false;
        this.error = true;
      }
    });
  }

  updateCurrentTemp(res: any) {
    this.error = false;
    this.location = res.name + ', ' + res.sys.country;
    this.currentWeather = utils.createCurrentWeather(res);
    this.currentWeatherLoaded = true;
  }

}
