import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FitnessDayListPage } from './fitness-day-list.page';

describe('FitnessDayListPage', () => {
  let component: FitnessDayListPage;
  let fixture: ComponentFixture<FitnessDayListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessDayListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
