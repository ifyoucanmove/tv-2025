import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
  standalone: true,
  imports: [SharedModule,HttpClientModule]
})
export class RecipeListPage implements OnInit {

  recipeList:any[] = [];
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    this.loadRecipe();
  }

  loadRecipe() {
    this.http.get('assets/json/recipe.json').subscribe((data: any) => {
      this.recipeList = data;
    });
  }

  navigateToRecipe(title: string) {
    this.router.navigate(['/recipes'],{queryParams: {category: title}});
  }
}
