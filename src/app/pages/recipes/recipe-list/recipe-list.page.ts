import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class RecipeListPage implements OnInit {
  categoryName: any;
  recipeList: any[] = [];
  constructor(
    public route: ActivatedRoute,
    private apiService: ApiService,private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      this.categoryName = params.category;
      this.loadRecipe(params.category);
    });
  }

  loadRecipe(category: string) {
    this.apiService.getPostByCategory(category).subscribe((data: any) => {
 console.log(data)
 this.recipeList = data.posts;
    })
  
  }

  navigateToSingleRecipe(item: any) {
     this.navCtrl.navigateForward(`/single-recipe/${item.id}`, {
    state: {
      data: item
    }
  });
  //  this.router.navigate(['/single-recipe', id]);
  }
}
