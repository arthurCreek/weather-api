import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  error = false;
  zipcodeError = false;

  constructor(private weatherService: WeatherService) {
    this.formGroup = new FormGroup({
      zipcode: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void { }

  submitZipcode() {
    const zipcode = this.formGroup.value.zipcode.toString();
    if(zipcode.length === 5 && zipcode != null) {
      this.zipcodeError = false;
      this.getForecast(zipcode);
    } else {
      this.zipcodeError = true;
    }
  }

  updateCurrentTemps(res: any) {
    this.error = false;
    this.location = res.city.name + ', ' + res.city.country;
    this.currentWeather = utils.createFiveDayForecast(res);
    this.currentWeatherLoaded = true;
  }

  getForecast(zipcode: string) {
    this.weatherService.getGetFiveDayForecast(zipcode).subscribe(res => {
      if(res != null) {
        this.updateCurrentTemps(res);
      } else {
        this.currentWeatherLoaded = false;
        this.error = true;
      }
    });
  }

}
