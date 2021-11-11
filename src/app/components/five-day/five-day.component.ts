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
    // Initiate form falues
    this.setFormValues();
  }

  ngOnInit(): void {
    // Fetch forecast weather data based on zipcode
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

  // Validate zipcode, save zipcode, get current weather
  submitZipcode() {
    const zipcode = this.formGroup.value.zipcode.toString();
    if (zipcode.length === 5 && zipcode != null) {
      this.zipcodeError = false;
      this.weatherService.setZipcode(zipcode);
      this.getForecast(zipcode);
    } else {
      this.zipcodeError = true;
    }
  }

  // Fetch data from weather service
  getForecast(zipcode: string) {
    this.weatherService.getGetFiveDayForecast(zipcode).subscribe(res => {
      if (res != null) {
        this.currentWeather = utils.createFiveDayForecast(res);
        this.location = res.city.name + ', ' + res.city.country;
        this.error = false;
        this.currentWeatherLoaded = true;
      } else {
        this.currentWeatherLoaded = false;
        this.error = true;
      }
    });
  }

}
