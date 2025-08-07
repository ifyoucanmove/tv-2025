import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { IonSkeletonText } from '@ionic/angular/standalone';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
  standalone: true,
  imports: [SharedModule,IonSkeletonText],
})
export class FavouritePage implements OnInit {
  favoriteList: any[] = [];
   type: string = '';
    challengeDays: any = {};
      imageLoaded: boolean = true;
  constructor(private apiService: ApiService,public authService:AuthService,
      private navCtrl: NavController,public commonService:CommonService,
     private router: Router) {}

  ngOnInit() {
      this.commonService.loader = true;
    this.loadFavorite();
  }

  loadFavorite() {
    this.apiService.getFavorites(this.authService.userObjData.email).subscribe((data: any) => {
      this.favoriteList = data.favorites;
      console.log(this.favoriteList)
       setTimeout(() => {
      let ele = document.getElementById('favorite-card-0');
      if (ele) {
        ele.focus();
      }
    }, 2000);
        this.commonService.loader = false;
    },err=>{
        this.commonService.loader = false;
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
          this.router.navigate(['workout-detail/',post.postId], {
  queryParams: { isFav: true }
});
          break;
        case 'challenge':
          this.loadChallengeDetails(post.challengeId,post)
      
          break;
       
        case 'byo-combo':
          this.router.navigate(['combo-details/',post.postId]);
          break;
        default:
          break;
      }
    }
  }

  loadChallengeDetails(id: any,post:any) {
    this.apiService.getChallengeDetails(id).subscribe((data: any) => {
    //  this.challenges = data.days;
      this.challengeDays = this.groupDaysByWeeks(data.days);
    //  console.log('Challenges:', this.challengeDays);
      const week = Math.ceil(Number(post.day) / 7);
      let  w =  `week${week}`
      console.log(week,'Challenges:',this.challengeDays[w]);
      let result = this.challengeDays[w].find((ele:any) => ele.day == post.day)
        console.log('result:',result);
      this.navCtrl.navigateForward(`/challenge-video-detail/${post.postId}`, {
      state: {
        data: result,
        challengeId: post.challengeId,
        challengeName: post.title,
      },
    }); 
    });
  }
    groupDaysByWeeks(daysArray: any) {
    const result: any = {};

    daysArray.forEach((dayObj: any, index: any) => {
      const weekNumber: any = Math.floor(index / 7) + 1;
      const weekKey: any = `week${weekNumber}`;

      if (!result[weekKey]) {
        result[weekKey] = [];
      }

      result[weekKey].push(dayObj);
    });
    console.log('Grouped Days by Weeks:', result);
    return result;
  }
}
