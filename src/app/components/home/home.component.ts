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
    this.setFormValues();
  }

  ngOnInit(): void {

  }

  public setFormValues() {
    const form = localStorage.getItem('form');
    let savedZipcode = '';
    if (form) {
      savedZipcode = JSON.parse(form).zipcode;
    }
    this.formGroup = new FormGroup({
      zipcode: new FormControl(savedZipcode, [Validators.required])
    })
  }

  submitZipcode() {
    const zipcode = this.formGroup.value.zipcode.toString();
    if (zipcode.length === 5 && zipcode != null) {
      this.zipcodeError = false;
      this.getCurrentWeather(zipcode);
      this.formGroup.markAllAsTouched();
      const formValues = JSON.stringify(this.formGroup.value);
      localStorage.setItem('form', formValues);
    } else {
      this.zipcodeError = true;
    }
  }

  updateCurrentTemp(res: any) {
    this.error = false;
    this.location = res.name + ', ' + res.sys.country;
    this.currentWeather = utils.createCurrentWeather(res);
    this.currentWeatherLoaded = true;
  }

  getCurrentWeather(zipcode: string) {
    this.weatherService.getCurrentForecast(zipcode).subscribe(res => {
      if (res != null) {
        this.updateCurrentTemp(res);
      } else {
        this.currentWeatherLoaded = false;
        this.error = true;
      }
    });
  }

}
