import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FitnessDashboardDetailsPage } from './fitness-dashboard-details.page';

describe('FitnessDashboardDetailsPage', () => {
  let component: FitnessDashboardDetailsPage;
  let fixture: ComponentFixture<FitnessDashboardDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessDashboardDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
