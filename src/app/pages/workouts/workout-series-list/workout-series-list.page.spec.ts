import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutSeriesListPage } from './workout-series-list.page';

describe('WorkoutSeriesListPage', () => {
  let component: WorkoutSeriesListPage;
  let fixture: ComponentFixture<WorkoutSeriesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutSeriesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
