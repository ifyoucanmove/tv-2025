import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
import { MoodTrackerComponent } from 'src/app/shared/modals/mood-tracker/mood-tracker.component';
import { image } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmPopupComponent } from 'src/app/shared/modals/confirm-popup/confirm-popup.component';
import { MoodListDialogComponent } from 'src/app/shared/modals/mood-list-dialog/mood-list-dialog.component';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-challenge-video-details',
  templateUrl: './challenge-video-details.page.html',
  styleUrls: ['./challenge-video-details.page.scss'],
  standalone: true,
  imports: [SharedModule, VideoSectionComponent],
})
export class ChallengeVideoDetailsPage implements OnInit {
  videoId: any;
  videoData: any;
  challenges: any[] = [];
  challengeId: any;
  challengeName: any;
  repeatCount!: number;
  watchData: any[] = [];
  lastWatched: any[] = [];
  isCompleted = false;

  isLoading:boolean = true;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public authService: AuthService,
    public apiService: ApiService,
    private modalCtrl: ModalController,
    public commonService:CommonService
  ) {
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation, 'navigation');
    if (navigation?.extras.state) {
      const data: any = navigation.extras.state;
      this.videoData = data.data;
      this.challengeId = data.challengeId;
      this.challengeName = data.challengeName;
      console.log(data, 'ss');
    }
  }

  ngOnInit() {
    this.commonService.loader = true;
    if (this.authService.customer().challengeData[this.challengeId]) {
      this.repeatCount =
        this.authService.customer().challengeData[this.challengeId].repeatCount;
    } else {
      this.repeatCount = 0;
    }
    console.log(this.authService.customer(), 'cu', this.repeatCount);
    this.route.params.subscribe((params: any) => {
      this.videoId = params.id;
      this.loadVideo();
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('ngAfterViewInit');
      let ele = document.getElementById('play-btn');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      console.log('ionViewDidEnter');
      let ele = document.getElementById('play-btn');
      if (ele) {
        ele.focus();
      }
    }, 3000);
  }

  loadVideo() {
    this.apiService.getChallengeList().subscribe((res: any) => {
      this.challenges = res.challenges.map((ele: any) => {
        return {
          id: ele.id,
          image: ele.dashBannerUrl,
          title: ele.dashTitle,
          duration: '20',
        };
      });
    });
    this.loadWatchData();
  }

  loadWatchData() {
    let data = {
      repeatCount: this.repeatCount,
      userId: this.authService.userObjData.email,
      challengeId: this.challengeId,
      day: this.videoData.day,
    };

    this.apiService
      .geWatchCompletedDataOfChallenge(data)
      .subscribe((res: any) => {
        console.log(res);
        this.watchData = res;
        this.getLastWatched(this.watchData);
        this.isLoading = false;
        this.commonService.loader = false;
      },err=>{
          this.isLoading = false;
          this.commonService.loader = false;
      });
  }
  getLastWatched(watched: any[]) {
    const data = watched.filter((result: { day: string }) => {
      return result.day === String(this.videoData.day);
    });
    if (data.length > 1) {
      data.sort((a: any, b: any) => {
        return a.date - b.date;
      });
    }
    this.lastWatched = data;
  }
  isDayVideoWatched(day: any) {
    const data = this.watchData.filter((res) => {
      return res.day === String(day);
    });
    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  async openMoodTracker() {
    const modal = await this.modalCtrl.create({
      component: MoodTrackerComponent,
      cssClass: 'mood-tracker-modal',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Selected mood:', data);
      this.saveMarkAsComplete(data);
    }
  }

  saveMarkAsComplete(energyData: any) {
    this.isCompleted = this.isDayVideoWatched(this.videoData.day);
    let obj = {
      category: 'challenge',
      isCompletedEmails: this.authService.customer().isCompletedEmails ?? false,
      energyData: energyData,
      userId: this.authService.userObjData.email,
      title: this.challengeName,
      durationMinutes: this.videoData.durationMinutes,
      watchCount: this.isCompleted ? this.getMaxWatchCount() + 1 : 1,
      repeatCount: this.repeatCount,
      isEnergyDataAvailable: energyData ? true : false,
      challengeId: this.challengeId,
      day: this.videoData.day,
    };
    console.log(obj);
    if (this.isCompleted) {
      this.openDialog(obj);
    } else {
      this.apiService.markAsComplete(obj).subscribe((res) => {
        if (res) {
          this.loadWatchData();
        }
      });
    }
  }
  getMaxWatchCount(): number {
    if (!this.watchData) {
      return 0;
    }
    return this.watchData.length;
  }
  async onVideoOpen(video: any) {
    let videoData = {
      title: video.title1,
      image: video.image,
      videoId: video.id,
      video: video.url,
      description: '',
    };
    try {
      const modal = await this.modalCtrl.create({
        component: VideoPlayerComponent,
        componentProps: {
          video: videoData,
        },
        cssClass: 'video-player-modal',
        showBackdrop: true,
        backdropDismiss: true,
      });

      await modal.present();
    } catch (error) {
      console.error('Error opening video modal:', error);
    }
  }
  onViewAllChallenges(): void {
    this.router.navigate(['/challenge-list']);
  }

  onCardChallenges(video: any): void {
    this.router.navigate(['/challenge-detail/', video.id]);
  }

  async openDialog(watchData: any) {
    const modal = await this.modalCtrl.create({
      component: ConfirmPopupComponent,
      componentProps: {
        // Your data goes here
        title: 'Confirm Action',
        message: 'Are you sure you want to mark this video as complete again?',
        confirmText: 'Yes',
        cancelText: 'No',
      },
      cssClass: 'confirm-modal',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Selected:', data);
      this.apiService.markAsComplete(watchData).subscribe((res) => {
        console.log(res);
        this.loadWatchData();
      });
    }
  }
  getDayWatchCount(day: any) {
    const data = this.watchData.filter((res) => {
      return res.day === String(day);
    });
    return data?.length ?? 0;
  }

  checkMoodIconVisible(day: any): any {
      if (this.watchData && this.watchData.length) {
        const data = this.watchData.filter((res) => {
          return res.day === day
        });
        if(data.length > 0){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    }
    async  openMoodList(item:any){
        let list = this.watchData.filter(ele => ele.day == item);
     const modal = await this.modalCtrl.create({
      component: MoodListDialogComponent,
 componentProps: {data:list},
 cssClass: 'mood-list-dialog'
     })
     await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
    }
      
    }
}
