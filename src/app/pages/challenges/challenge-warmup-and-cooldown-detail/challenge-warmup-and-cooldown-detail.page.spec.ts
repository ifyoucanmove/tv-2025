import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengeWarmupAndCooldownDetailPage } from './challenge-warmup-and-cooldown-detail.page';

describe('ChallengeWarmupAndCooldownDetailPage', () => {
  let component: ChallengeWarmupAndCooldownDetailPage;
  let fixture: ComponentFixture<ChallengeWarmupAndCooldownDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeWarmupAndCooldownDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
