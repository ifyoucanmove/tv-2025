import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengeListPage } from './challenge-list.page';

describe('ChallengeListPage', () => {
  let component: ChallengeListPage;
  let fixture: ComponentFixture<ChallengeListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
