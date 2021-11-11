import { WeatherService } from "./weather.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('HeroesService (with spies)', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let weatherService: WeatherService;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
        providers: [weatherService]
      }));

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        weatherService = new WeatherService(httpClientSpy as any);
    });

    it('should be created', () => {
        expect(weatherService).toBeTruthy();
    });
})