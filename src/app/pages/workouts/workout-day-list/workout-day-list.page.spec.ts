import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutDayListPage } from './workout-day-list.page';

describe('WorkoutDayListPage', () => {
  let component: WorkoutDayListPage;
  let fixture: ComponentFixture<WorkoutDayListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutDayListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
