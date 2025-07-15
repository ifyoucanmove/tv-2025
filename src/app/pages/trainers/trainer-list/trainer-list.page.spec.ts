import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerListPage } from './trainer-list.page';

describe('TrainerListPage', () => {
  let component: TrainerListPage;
  let fixture: ComponentFixture<TrainerListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
