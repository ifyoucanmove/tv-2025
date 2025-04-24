import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FitnessDetailPage } from './fitness-detail.page';

describe('FitnessDetailPage', () => {
  let component: FitnessDetailPage;
  let fixture: ComponentFixture<FitnessDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
