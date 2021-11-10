import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayComponent } from './five-day.component';

describe('FiveDayComponent', () => {
  let component: FiveDayComponent;
  let fixture: ComponentFixture<FiveDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiveDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
