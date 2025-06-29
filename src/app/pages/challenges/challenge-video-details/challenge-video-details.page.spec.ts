import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengeVideoDetailsPage } from './challenge-video-details.page';

describe('ChallengeVideoDetailsPage', () => {
  let component: ChallengeVideoDetailsPage;
  let fixture: ComponentFixture<ChallengeVideoDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeVideoDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
