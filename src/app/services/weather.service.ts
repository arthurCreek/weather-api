import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    readonly currentUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&zip='
    readonly fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&zip='
    readonly appID = `&appid=${environment.openWeatherApiKey}`;
    private tempZipCode = 90706;

    private weather = new BehaviorSubject([]);
    currentWeather = this.weather.asObservable();

    constructor(private http: HttpClient) { }

    getCurrentForecast(): Observable<any> {
        const url = this.currentUrl + this.tempZipCode + this.appID;

        return this.http.get<any>(url).pipe(
            map(data => ({
                ...data,
                icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            }))
        )
    }

    getGetFiveDayForecast(): Observable<any> {
        const url = this.fiveDayUrl + this.tempZipCode + this.appID;

        return this.http.get<any>(url).pipe();
    }
}