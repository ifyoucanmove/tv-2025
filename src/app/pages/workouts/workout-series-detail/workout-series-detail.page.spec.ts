import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutSeriesDetailPage } from './workout-series-detail.page';

describe('WorkoutSeriesDetailPage', () => {
  let component: WorkoutSeriesDetailPage;
  let fixture: ComponentFixture<WorkoutSeriesDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutSeriesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
