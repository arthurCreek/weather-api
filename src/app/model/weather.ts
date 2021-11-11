export class Weather {
    date!: string;
    time!: string;
    temperature!: string;
    icon!: string;
}

export class WeatherType {
    static CURRENT = 'current';
    static FIVE_DAY = 'five_day';
}