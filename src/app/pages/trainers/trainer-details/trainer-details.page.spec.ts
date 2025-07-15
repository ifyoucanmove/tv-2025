import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerDetailsPage } from './trainer-details.page';

describe('TrainerDetailsPage', () => {
  let component: TrainerDetailsPage;
  let fixture: ComponentFixture<TrainerDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
