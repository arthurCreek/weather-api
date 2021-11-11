import { Weather } from "../model/weather";
import * as moment from 'moment';

export function createCurrentWeather(weather: any): Weather {
    console.log(weather.dt)
    let currentWeather = new Weather();
    currentWeather.date_time = moment.unix(weather.dt).format('MMM DD YYYY | LT').toString();
    currentWeather.temperature = weather.main.temp;
    currentWeather.icon = weather.icon;

    return currentWeather;
}