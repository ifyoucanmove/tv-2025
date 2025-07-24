import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-categories',
  templateUrl: './recipe-categories.page.html',
  styleUrls: ['./recipe-categories.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class RecipeCategoriesPage implements OnInit {
  recipeList: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadRecipe();
  }

  loadRecipe() {
     this.apiService.getCategoriesList().subscribe((res: any) => {
   this.recipeList = res.categories['recipes'];
             this.setFocus()
    });
  }
setFocus() {
    setTimeout(() => {
      let ele = document.getElementById('recipee-card-0');
       console.log(ele,"ele")
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }
  navigateToRecipe(title: string) {
    this.router.navigate(['/recipes'], { queryParams: { category: title } });
  }
}
