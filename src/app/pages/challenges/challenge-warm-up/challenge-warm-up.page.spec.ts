import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengeWarmUpPage } from './challenge-warm-up.page';

describe('ChallengeWarmUpPage', () => {
  let component: ChallengeWarmUpPage;
  let fixture: ComponentFixture<ChallengeWarmUpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeWarmUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
