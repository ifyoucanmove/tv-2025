import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import {
  IonSkeletonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.page.html',
  styleUrls: ['./challenge-details.page.scss'],
  standalone: true,
  imports: [SharedModule,IonSkeletonText],
})
export class ChallengeDetailsPage implements OnInit ,AfterViewInit{
  challenges: any[] = [];
  coolDownList: any[] = [];
  warmUpList: any[] = [];

  challengeDays:any = {};
    imageLoaded:boolean = true;
  constructor(
    private apiService: ApiService,
    private modalController: ModalController,
    private router: Router,
    public route:ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const challengeId = params['id'];
      if (challengeId) {
        this.loadChallengeDetails(challengeId);
      }
    });
  }
   ngAfterViewInit(): void {
    setTimeout(() => {
      let ele = document.getElementById('weekcard0');
        console.log(ele,'ionViewDidEnter');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      console.log('ionViewDidEnter');
      let ele = document.getElementById('weekcard0');
      if (ele) {
        ele.focus();
      }
    }, 3000);
  }

  loadChallengeDetails(id:any) {
    this.apiService.getChallengeDetails(id).subscribe((data: any) => {
      this.challenges = data.days;
     this.challengeDays = this.groupDaysByWeeks(this.challenges)
      console.log('Challenges:', this.challenges);
    });
    this.apiService.getCoolDownList().subscribe((data: any) => {
      this.coolDownList = data;
    });
    this.apiService.getWarmUpList().subscribe((data: any) => {
      this.warmUpList = data;
    });
  }
  groupDaysByWeeks(daysArray:any) {
  const result:any = {};
  
  daysArray.forEach((dayObj:any, index:any) => {
    const weekNumber:any = Math.floor(index / 7) + 1;
    const weekKey:any = `week${weekNumber}`;
    
    if (!result[weekKey]) {
      result[weekKey] = [];
    }
    
    result[weekKey].push(dayObj);
  });
  console.log('Grouped Days by Weeks:', result);
  return result;
}
  openDetailPage(item:any){
        this.navCtrl.navigateForward(`/challenge-video-detail/${item.id}`, {
    state: {
      data: item
    }
  });
      }
 
}
