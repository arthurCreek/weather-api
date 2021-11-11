import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/model/weather';

@Component({
  selector: 'app-temp-card',
  templateUrl: './temp-card.component.html',
  styleUrls: ['./temp-card.component.css']
})
export class TempCardComponent implements OnInit {

  @Input() currentWeather!: Weather;

  constructor() { }

  ngOnInit(): void {
    
  }

}
