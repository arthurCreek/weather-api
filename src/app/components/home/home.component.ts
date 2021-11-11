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
  formGroup!: FormGroup;
  currentWeather: Weather = new Weather;
  currentWeatherLoaded = false;
  weatherType = WeatherType.CURRENT;
  location: string = '';
  error = false;
  zipcodeError = false;

  constructor(private weatherService: WeatherService) {
    // Initiate form falues
    this.setFormValues();
  }

  ngOnInit(): void {
    // Fetch current weather data based on zipcode
    this.weatherService.currentZipcode.subscribe(zipcode => {
      if (zipcode != null && zipcode !== '') {
        this.formGroup.get('zipcode')?.setValue(zipcode);
        this.getCurrentWeather(zipcode)
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
      this.getCurrentWeather(zipcode);
    } else {
      this.zipcodeError = true;
    }
  }

  // Fetch data from weather service
  getCurrentWeather(zipcode: string) {
    this.weatherService.getCurrentForecast(zipcode).subscribe(res => {
      if (res != null) {
        this.currentWeather = utils.createCurrentWeather(res);
        this.location = res.name + ', ' + res.sys.country;
        this.error = false;
        this.currentWeatherLoaded = true;
      } else {
        this.currentWeatherLoaded = false;
        this.error = true;
      }
    });
  }
}
