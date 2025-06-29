import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCategoriesPage } from './recipe-categories.page';

describe('RecipeCategoriesPage', () => {
  let component: RecipeCategoriesPage;
  let fixture: ComponentFixture<RecipeCategoriesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
