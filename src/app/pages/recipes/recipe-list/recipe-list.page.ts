import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { IonSkeletonText } from '@ionic/angular/standalone';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
  standalone: true,
  imports: [SharedModule, IonSkeletonText],
})
export class RecipeListPage implements OnInit {
  categoryName: any;
  recipeList: any[] = [];
  imageLoaded: boolean = true;
  constructor(
    public route: ActivatedRoute,
    private apiService: ApiService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.categoryName = params.category;
      this.loadRecipe(params.category);
    });
  }

  loadRecipe(category: string) {
    this.apiService.getPostByCategory(category).subscribe((data: any) => {
      this.recipeList = data.posts;
      this.setFocus();
    });
  }
  setFocus() {
    setTimeout(() => {
      let ele = document.getElementById('recipe-list-0');
      if (ele) {
        ele.focus();
      }
    }, 100);
  }
  navigateToSingleRecipe(item: any) {
    this.navCtrl.navigateForward(`/single-recipe/${item.id}`, {
      state: {
        data: item,
      },
    });
  }
}
