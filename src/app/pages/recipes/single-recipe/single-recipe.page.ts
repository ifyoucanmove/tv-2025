import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { IonSkeletonText } from '@ionic/angular/standalone';
@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.page.html',
  styleUrls: ['./single-recipe.page.scss'],
  standalone: true,
  imports: [SharedModule,IonSkeletonText],
})
export class SingleRecipePage implements OnInit {
  recipeData: any;
     favList:any=[];
   favDocid:any;
     imageLoaded: boolean = true;
   id:any;
  constructor(
    public route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    public authService:AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data: any = navigation.extras.state;
      this.recipeData = data.data;
      console.log(data.data, 'ss');
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((res:any) =>{
    
     this.id = res.params.id;
       console.log(this.id,"id")
         if(!this.recipeData){
       this.apiService.getPostById(this.id).subscribe(res =>{
        console.log(res,'getPostById')
        this.recipeData = res;
            this.getFavList()
      }) }
      else{
this.getFavList()
      } 
    })
   
   
  }

    setFocus() {
    setTimeout(() => {
      let ele = document.getElementById('favbtn');
       if (ele) {
        ele.focus();
      }
    }, 1000);
  }

    getFavList(){
    this.apiService.getFavorites(this.authService.userObjData.email).subscribe((res:any) =>{
      console.log(res,"favlist")
      this.favList = res.favorites;
      let result = this.favList.find((item: any) => item.postId === this.recipeData.id);
      if(result){
      this.favDocid = result.docid;
      }
     this.setFocus()
    })
    }

    addTofav(){
      let obj=
      {
    "id": this.recipeData.id,
    "postId": this.recipeData.id,
    "email": this.authService.userObjData.email,
    "title": this.recipeData.title,
    "image": this.recipeData.image,
    "type": this.recipeData.type,
    "media":this.recipeData.media,
    "description": this.recipeData.description,
    "duration": this.recipeData.duration,
    "categories": this.recipeData.categories,
    "categoryArray":this.recipeData.categoryArray,
    "ingredients": this.recipeData.ingredients
}

this.apiService.addFavorites(obj).subscribe(res =>{
  console.log(res)
  this.getFavList()
})

    }

    removeFromFavList(){
      console.log(this.favDocid)
      this.apiService.deleteFavorites(this.favDocid).subscribe(res =>{
      this.getFavList()
      })
    }

    checkFavorites(){
   // let result = this.favList.find(ele => ele.)
     const favoriteList =  this.favList;
     if(!favoriteList ){
  return
     }
    return favoriteList
      ? favoriteList.filter((item: any) => item.postId === this.recipeData.id).length
      : favoriteList;
    }
 
}
