import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMadeComboPage } from './user-made-combo.page';

describe('UserMadeComboPage', () => {
  let component: UserMadeComboPage;
  let fixture: ComponentFixture<UserMadeComboPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMadeComboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
