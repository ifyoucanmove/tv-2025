import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recipe-category-list',
  templateUrl: './recipe-category-list.page.html',
  styleUrls: ['./recipe-category-list.page.scss'],
  standalone: true,
  imports: [SharedModule,HttpClientModule]
})
export class RecipeCategoryListPage implements OnInit {
 
  recipeData:any;
  recipeList:any[] = [];
  constructor(public route: ActivatedRoute,private http: HttpClient,private router: Router) { }

  ngOnInit() {
   this.route.queryParams.subscribe((params: any) => {
    console.log(params);
    this.loadRecipe(params.category);
   });
  }

  loadRecipe(category: string) {
    this.http.get('assets/json/recipe.json').subscribe((data: any) => {
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
