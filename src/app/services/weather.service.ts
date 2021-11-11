import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { Weather } from "../model/weather";


@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    readonly currentUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&zip='
    readonly fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&zip='
    readonly appID = `&appid=${environment.openWeatherApiKey}`;

    private zipcode = new BehaviorSubject('');
    currentZipcode = this.zipcode.asObservable();

    private weather = new BehaviorSubject(new Weather);
    currentWeather = this.weather.asObservable();

    forecastWeatherList: Weather[][] = [];
    private forecastWeather = new BehaviorSubject(this.forecastWeatherList);
    currentForecastWeather = this.forecastWeather.asObservable();

    private location = new BehaviorSubject('');
    currentlocation = this.location.asObservable();

    private forecastLocation = new BehaviorSubject('');
    currentForecastLocation = this.forecastLocation.asObservable();

    constructor(private http: HttpClient) { }

    getCurrentForecast(zipcode: string): Observable<any> {
        const url = this.currentUrl + zipcode+ this.appID;

        return this.http.get<any>(url).pipe(
            map(data => ({
                ...data,
                icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            })), catchError(this.handleError('current'))
        )
    }

    getGetFiveDayForecast(zipcode: string): Observable<any> {
        const url = this.fiveDayUrl + zipcode + this.appID;

        return this.http.get<any>(url).pipe(catchError(this.handleError('forecast')));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // log to console instead
            console.error(error.message); 
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    setCurrentWeather(weather: Weather) {
        this.weather.next(weather);
    }

    setCurrentLocation(location: string) {
        this.location.next(location);
    }

    setForecastWeather(weather: Weather[][]) {
        this.forecastWeather.next(weather);
    }

    setForecastLocation(forecastLocation: string) {
        this.forecastLocation.next(forecastLocation);
    }

    setZipcode(zipcode: string) {
        this.zipcode.next(zipcode);
    }
}