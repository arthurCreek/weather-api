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
  formGroup!: FormGroup;
  currentWeather: Weather[][] = [];
  currentWeatherLoaded = false;
  location: string = '';
  weatherType = WeatherType.FIVE_DAY;
  error = false;
  zipcodeError = false;

  constructor(private weatherService: WeatherService) {
    this.setFormValues();
  }

  ngOnInit(): void {
    this.weatherService.currentForecastWeather.subscribe(weather => {
      if (weather != null && weather.length > 0) {
        this.currentWeather = weather;
        this.error = false;
        this.currentWeatherLoaded = true;
      } else {
        this.currentWeather = [];;
        this.currentWeatherLoaded = false;
      }
    });
    this.weatherService.currentForecastLocation.subscribe(location => {
      if (location != null) {
        this.location = location;
      }
    });
    this.weatherService.currentZipcode.subscribe(zipcode => {
      if (zipcode != null && zipcode !== '') {
        this.formGroup.get('zipcode')?.setValue(zipcode);
        this.getForecast(zipcode)
      }
    })
   }

  public setFormValues() {
    this.formGroup = new FormGroup({
      zipcode: new FormControl('', [Validators.required])
    })
  }

  submitZipcode() {
    const zipcode = this.formGroup.value.zipcode.toString();
    if(zipcode.length === 5 && zipcode != null) {
      this.zipcodeError = false;
      this.weatherService.setZipcode(zipcode);
      this.getForecast(zipcode);
    } else {
      this.zipcodeError = true;
    }
  }

  updateCurrentTemps(res: any) {
    this.weatherService.setForecastWeather(utils.createFiveDayForecast(res));
    this.weatherService.setForecastLocation(res.city.name + ', ' + res.city.country);
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
