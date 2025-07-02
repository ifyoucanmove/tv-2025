import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComboDashboardPage } from './combo-dashboard.page';

describe('ComboDashboardPage', () => {
  let component: ComboDashboardPage;
  let fixture: ComponentFixture<ComboDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
