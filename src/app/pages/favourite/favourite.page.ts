import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class FavouritePage implements OnInit {
  favoriteList: any[] = [];
   type: string = '';
  constructor(private apiService: ApiService,public authService:AuthService,
     private router: Router) {}

  ngOnInit() {
    this.loadFavorite();
  }

  loadFavorite() {
    this.apiService.getFavorites(this.authService.userObjData.email).subscribe((data: any) => {
      this.favoriteList = data.favorites;
      console.log(this.favoriteList)
    });
  }

  navigate(post:any){
   console.log(post)
     if (post.type) {
      this.type = post.type;
      const data: any = {};
      switch (this.type) {
        case 'Recipe':
          this.router.navigate(['single-recipe/',post.postId]);
          break;
        case 'Workout':
          this.router.navigate(['workout-detail/',post.postId]);
          // this.router.navigate(['workout-series-detail/',post.postId]);
          break;
        case 'challenge':
         /*  if (this.status !== 'active' && !post.isPaid) {
            alert('This item is only accessible with a  subscription!');
          } else { */
           // this.challengeService.challengeId = post.challengeId;
            const week = Math.ceil(Number(post.day) / 7);
            this.router.navigate([`challenge-video-detail/` ,post.day ]);
        /*   } */
          break;
        case 'BYO':
          data.title = post.title;
          data.media = post.image;
          data.id = post.postId;
          console.log(data);

          this.router.navigate(['byo', { byo_data: JSON.stringify(data) }]);
          break;
        case 'byo-combo':
          this.router.navigate(['combo-details/',post.postId]);
          break;
        default:
          break;
      }
    }
  }
}
