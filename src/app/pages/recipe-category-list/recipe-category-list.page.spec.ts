import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCategoryListPage } from './recipe-category-list.page';

describe('RecipeCategoryListPage', () => {
  let component: RecipeCategoryListPage;
  let fixture: ComponentFixture<RecipeCategoryListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCategoryListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
