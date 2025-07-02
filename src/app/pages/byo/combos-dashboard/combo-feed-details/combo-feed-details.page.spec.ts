import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComboFeedDetailsPage } from './combo-feed-details.page';

describe('ComboFeedDetailsPage', () => {
  let component: ComboFeedDetailsPage;
  let fixture: ComponentFixture<ComboFeedDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboFeedDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
