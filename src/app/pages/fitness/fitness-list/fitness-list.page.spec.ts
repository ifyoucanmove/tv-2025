import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FitnessListPage } from './fitness-list.page';

describe('FitnessListPage', () => {
  let component: FitnessListPage;
  let fixture: ComponentFixture<FitnessListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
