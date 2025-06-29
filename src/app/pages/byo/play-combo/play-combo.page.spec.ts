import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayComboPage } from './play-combo.page';

describe('PlayComboPage', () => {
  let component: PlayComboPage;
  let fixture: ComponentFixture<PlayComboPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayComboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
