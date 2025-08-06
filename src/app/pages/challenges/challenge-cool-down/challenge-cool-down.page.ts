import { Component, input, OnInit } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';

import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-challenge-cool-down',
  templateUrl: './challenge-cool-down.page.html',
  styleUrls: ['./challenge-cool-down.page.scss'],
  standalone: true,
 imports: [SharedModule,IonSkeletonText]
})
export class ChallengeCoolDownPage implements OnInit {
  imageLoaded: boolean = true;
  challengeId = input<string>('');
  challengeName = input<string>('');
  list:any =[
      {
    title:'Cool Down',
     value:12,
     image:'assets/images/live/challenge-cool-down/CoolDown1.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Materials/Cool_Down.mp4'
  },
  {
    title:'Cool Down 2',
     value:17,
     image:'assets/images/live/challenge-cool-down/Cooldown_2.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/Challenges/Materials/cool_down_2.mp4'
  },
  {
    title:'Cool Down 3',
     value:14,
     image:'assets/images/live/challenge-cool-down/Foam_Roll_Stretch.webp',
    media:'https://s3.amazonaws.com/move_cloudfront/MOVE+Videos+2021/Foam_Roll_Stretch.mp4'
  },
  ]
  constructor(public apiService:ApiService,private navCtrl: NavController,
    public authService:AuthService) { }

  ngOnInit() {
  setTimeout(() => {
      console.log('ionViewDidEnter');
      let ele = document.getElementById('coolcard0');
      if (ele) {
        ele.focus();
      }
    }, 3000);
  }
 ionViewDidEnter() {
    setTimeout(() => {
      console.log('ionViewDidEnter');
      let ele = document.getElementById('coolcard0');
      if (ele) {
        ele.focus();
      }
    }, 3000);
  }
onNavigate(item:any){
  let category = 'challenge-cool-down';
    this.navCtrl.navigateForward(`/challenge-page-detail/${category}`, {
      state: {
        data: item,
        challengeId: this.challengeId(),
         category: 'challenge-cool-down',
         challengeName: this.challengeName()
      },
    });
  
}
}
