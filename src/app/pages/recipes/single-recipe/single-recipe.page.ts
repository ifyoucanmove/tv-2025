import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.page.html',
  styleUrls: ['./single-recipe.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class SingleRecipePage implements OnInit {
  recipeData: any;
  constructor(
    public route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
      const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras.state) {
    const data:any = navigation.extras.state;
    this.recipeData = data.data;
    console.log(data.data,"ss"); 
  }
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log(params);
    //  this.loadRecipe(params.id);
    });
  }

  loadRecipe(id: string) {
    this.apiService.getSingleRecipe().subscribe((data: any) => {
      let recipeList = data.filter((item: any) => item.id === id);
      this.recipeData = recipeList[0];
    });
  }
}
