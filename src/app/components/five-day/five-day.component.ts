import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-five-day',
  templateUrl: './five-day.component.html',
  styleUrls: ['./five-day.component.css']
})
export class FiveDayComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private weatherService: WeatherService) {
    this.formGroup = new FormGroup({
      zipcode: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.weatherService.getGetFiveDayForecast().subscribe(res => {
      console.log(res)
    });
  }

}
