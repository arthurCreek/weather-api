import { Weather } from "../model/weather";
import * as moment from 'moment';

export function createCurrentWeather(weather: any): Weather {
    let currentWeather = new Weather();
    currentWeather.date = moment.unix(weather.dt).format('MMM DD YYYY').toString();
    currentWeather.time = moment.unix(weather.dt).format('LT').toString();
    currentWeather.temperature = weather.main.temp;
    currentWeather.icon = weather.icon;

    return currentWeather;
}

export function createFiveDayForecast(weather: any): Weather[][] {
    let weatherListByDay: Weather[][] = [];
    const currentDay = moment();

    weather.forEach((element: any) => {
        let currentWeather = new Weather();
        currentWeather.date = moment(element.dt_txt).format('MMM DD YYYY').toString();
        currentWeather.time = moment(element.dt_txt).format('LT').toString();
        currentWeather.temperature = element.main.temp;
        currentWeather.icon = `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`;

        let dayIndex = moment(element.dt_txt).diff(currentDay, 'days');
        if (weatherListByDay[dayIndex] != null) {
            weatherListByDay[dayIndex].push(currentWeather);
        } else {
            weatherListByDay[dayIndex] = [];
            weatherListByDay[dayIndex].push(currentWeather);
        }
    });

    return weatherListByDay;
}