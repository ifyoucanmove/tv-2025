import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComboDetailsPage } from './combo-details.page';

describe('ComboDetailsPage', () => {
  let component: ComboDetailsPage;
  let fixture: ComponentFixture<ComboDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
