import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';

import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MoodTrackerComponent } from 'src/app/shared/modals/mood-tracker/mood-tracker.component';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmPopupComponent } from 'src/app/shared/modals/confirm-popup/confirm-popup.component';
import { MoodListDialogComponent } from 'src/app/shared/modals/mood-list-dialog/mood-list-dialog.component';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-workout-series-detail',
  templateUrl: './workout-series-detail.page.html',
  styleUrls: ['./workout-series-detail.page.scss'],
  standalone: true,
  imports: [SharedModule, VideoSectionComponent],
})
export class WorkoutSeriesDetailPage implements OnInit {
  programId: any;
  data: any;
  workoutSeries: any[] = [];

  repeatCount!: number;
  watchData: any[] = [];
  lastWatched: any[] = [];
  isCompleted = false;
  day: any;
  programTitle: any = '';
  status!: string;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private navCtrl: NavController,
    public apiService: ApiService,
    public authService: AuthService,
    public commonService:CommonService,
    private modalCtrl: ModalController
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data: any = navigation.extras.state;
      this.data = data.data;
      this.programId = data.data.programId;
      this.day = data.data.dayNumber;
      this.programTitle = data.programTitle;
      console.log(data.data, 'ss');
    }
  }

  ngOnInit() {
        const customerValue = this.authService.customer();
      if (customerValue) {
        this.status = customerValue.status;
           if (!customerValue) {
            this.status = "";
          }
          if (this.status !== 'active') {
            this.status = 'inactive';
          }
      }
     this.commonService.loader = true;
    this.route.queryParams.subscribe((params: any) => {
      this.loadData();
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
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

  loadData() {
    console.log(this.authService.customer(), 'customer');
    if (this.authService.customer().programData[this.programId]) {
      this.repeatCount =
        this.authService.customer().programData[this.programId].repeatCount;
    } else {
      this.repeatCount = 0;
    }
    this.apiService.getWorkoutList().subscribe((res: any) => {
      this.workoutSeries = res.workout.map((ele: any) => {
        return {
          id: ele.id,
          image: ele.image,
          title: ele.title,
        };
      });
      this.loadWatchData();
    });
  }
  loadWatchData() {
    let data = {
      userId: this.authService.userObjData.email,
      programId: this.programId,
      repeatCount: this.repeatCount,
    };
    this.apiService.geCompletetionDataOfSeries(data).subscribe((res: any) => {
      console.log(res);
      if (res.length > 0) {
        this.watchData = res.filter((ele: any) => ele.day == this.day);
        console.log(this.watchData);
        this.getLastWatched(this.watchData);
        this.commonService.loader = false;
      } else {
        this.watchData = [];
          this.commonService.loader = false;
      }
    },err=>{
      this.commonService.loader = false;
    });
  }

  async onVideoOpen(video: any) {
    if (video.post.type == 'Byo') {
      return;
    }
    let videoData = {
      title: video.postTitle,
      image: video.postImage,
      videoId: video.id,
      video: video.post.media,
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

  onViewAllWorkoutsSeries(): void {
    this.router.navigate(['/workout-series-list']);
  }
  onCardWorkoutsSeries(video: any): void {
    this.navCtrl.navigateForward(`/workout-day-series/${video.id}`, {
      state: {
        data: video,
      },
    });
  }

  getLastWatched(watched: any[]) {
    const data = watched.filter((result: { day: string }) => {
      return result.day === String(this.day);
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
      return res.day == day;
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
    this.isCompleted = this.isDayVideoWatched(this.day);
    let obj = {
      category: 'workout-series',
      isCompletedEmails: this.authService.customer().isCompletedEmails ?? false,
      energyData: energyData,
      userId: this.authService.userObjData.email,
      title: this.data.postTitle,
      programTitle: this.programTitle,
      durationMinutes: this.data.post.durationMinutes,
      watchCount: this.isCompleted ? this.getDayWatchCount(this.day) + 1 : 1,
      repeatCount: this.repeatCount,
      isEnergyDataAvailable: energyData ? true : false,
      programId: this.programId,
      day: this.day,
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
  getDayWatchCount(day: any): any {
    if (this.watchData && this.watchData.length) {
      const data = this.watchData.filter((res) => {
        return res.day === day;
      });
      return data.length;
    }
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
