import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show current temp link', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    expect(fixture.nativeElement.querySelector('[data-test="current-temp"]')).toBeTruthy();
  })

  it('should show five day temp link', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    expect(fixture.nativeElement.querySelector('[data-test="five-day-temp"]')).toBeTruthy();
  })
});
