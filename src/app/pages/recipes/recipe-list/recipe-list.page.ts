import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class RecipeListPage implements OnInit {
  recipeData: any;
  recipeList: any[] = [];
  constructor(
    public route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      this.loadRecipe(params.category);
    });
  }

  loadRecipe(category: string) {
    this.apiService.getRecipeCategory().subscribe((data: any) => {
      let recipeList = data.filter((item: any) => item.title === category);
      this.recipeData = recipeList[0];
      this.recipeList = recipeList[0].category;
      console.log(this.recipeList);
    });
  }

  navigateToSingleRecipe(id: string) {
    this.router.navigate(['/single-recipe', id]);
  }
}
