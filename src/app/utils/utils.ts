import { Weather } from "../model/weather";
import * as moment from 'moment';

/* ---------------------------------------------------------------- */
/* Create weather object with formatted date, time, temperature, icon */
/* ---------------------------------------------------------------- */
export function createCurrentWeather(weather: any): Weather {
    let currentWeather = new Weather();
    currentWeather.date = moment.unix(weather.dt).utcOffset(weather.timzone/60).format('MMM DD YYYY').toString();
    currentWeather.time = moment.unix(weather.dt).format('LT').toString();
    currentWeather.temperature = weather.main.temp;
    currentWeather.icon = weather.icon;

    return currentWeather;
}

/* ---------------------------------------------------------------- */
/* Create array of weather objects with formatted date, time, temperature, icon, sorted by date */
/* ---------------------------------------------------------------- */
export function createFiveDayForecast(data: any): Weather[][] {
    const weather = data.list;
    // Array of days will hold array of hours in each day - Ex. [[1pm, 2pm], [1pm,2pm]]
    let weatherListByDay: Weather[][] = [];
    // Get today formatted to check against dates
    const currentDay = moment().set({hour:0,minute:0,second:0,millisecond:0});

    weather.forEach((element: any) => {
        // Use this date to convert to local time
        const dateToChange = element.dt_txt + '+0000';

        let currentWeather = new Weather();
        currentWeather.date = moment.utc(dateToChange).local().format('MMM DD YYYY').toString();
        currentWeather.time = moment.utc(dateToChange).local().format('LT').toString();
        currentWeather.temperature = element.main.temp;
        currentWeather.icon = `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`;

        // Check how many days from today is the weather time
        let dayIndex = moment(currentWeather.date).diff(currentDay, 'days');
        // Sort weather data into respective index (day), check if index is not null
        if (weatherListByDay[dayIndex] != null) {
            weatherListByDay[dayIndex].push(currentWeather);
        } else {
            weatherListByDay[dayIndex] = [];
            weatherListByDay[dayIndex].push(currentWeather);
        }
    });

    return weatherListByDay;
}