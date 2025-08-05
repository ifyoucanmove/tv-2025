import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengeCoolDownPage } from './challenge-cool-down.page';

describe('ChallengeCoolDownPage', () => {
  let component: ChallengeCoolDownPage;
  let fixture: ComponentFixture<ChallengeCoolDownPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeCoolDownPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
