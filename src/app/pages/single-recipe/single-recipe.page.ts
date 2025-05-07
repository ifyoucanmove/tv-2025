import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.page.html',
  styleUrls: ['./single-recipe.page.scss'],
  standalone: true,
  imports: [SharedModule,HttpClientModule]
})
export class SingleRecipePage implements OnInit {
  recipeData: any;
  constructor(public route: ActivatedRoute,
    private http: HttpClient,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.loadRecipe(params.id);
    });
  }

  loadRecipe(id: string) {
    this.http.get('assets/json/single-recipe.json').subscribe((data: any) => {
      let recipeList = data.filter((item: any) => item.id === id);
      this.recipeData = recipeList[0];
      console.log(this.recipeData);
    }); 
  }
}
