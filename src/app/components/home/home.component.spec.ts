import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule ,ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show zipcode input', () => {
    expect(fixture.nativeElement.querySelector('[data-test="zipcode"]')).toBeTruthy();
  });

  it('TEST form group element count', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#zipcodeForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(1);
  })

  it('should update the zip code value of the input field', () => {
    component.formGroup.controls.zipcode.setValue(99999)

    const input = fixture.nativeElement.querySelector('#zipcode');

    expect(input.value).toEqual('99999');
  });

  it('should show forecast date and time, temp in farenheit, weather icon', () => {
    expect(fixture.nativeElement.querySelector('[data-test="temp-card"]')).toBeTruthy();
  })

});

