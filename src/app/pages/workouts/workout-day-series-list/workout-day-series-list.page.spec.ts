import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutDaySeriesListPage } from './workout-day-series-list.page';

describe('WorkoutDaySeriesListPage', () => {
  let component: WorkoutDaySeriesListPage;
  let fixture: ComponentFixture<WorkoutDaySeriesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutDaySeriesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
