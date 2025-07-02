import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreMadeComboPage } from './pre-made-combo.page';

describe('PreMadeComboPage', () => {
  let component: PreMadeComboPage;
  let fixture: ComponentFixture<PreMadeComboPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreMadeComboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
