import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ByoComboPage } from './byo-combo.page';

describe('ByoComboPage', () => {
  let component: ByoComboPage;
  let fixture: ComponentFixture<ByoComboPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ByoComboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
