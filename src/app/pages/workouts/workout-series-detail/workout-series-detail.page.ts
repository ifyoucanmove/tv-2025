import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';

import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MoodTrackerComponent } from 'src/app/shared/modals/mood-tracker/mood-tracker.component';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-workout-series-detail',
  templateUrl: './workout-series-detail.page.html',
  styleUrls: ['./workout-series-detail.page.scss'],
  standalone: true,
  imports: [SharedModule, VideoSectionComponent],
})
export class WorkoutSeriesDetailPage implements OnInit {

  id: any;
  data: any;
  workoutSeries: any[] = [];
  constructor(
    private route: ActivatedRoute,
    public router: Router,private navCtrl: NavController,
    public apiService: ApiService,
    private modalCtrl: ModalController
  ) {
       const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras.state) {
    const data:any = navigation.extras.state;
    this.data = data.data;
    console.log(data.data,"ss"); 
  }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.id;
      this.loadVideo();
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

  loadVideo() {
     this.apiService.getWorkoutList().subscribe((res: any) => {
     this.workoutSeries = res.workout.map((ele:any) => {
                  return {
                     id:ele.id,
                    image: ele.image,
                    title: ele.title
                  }
                 })
    });
  }
  async openMoodTracker() {
    const modal = await this.modalCtrl.create({
      component: MoodTrackerComponent,
      cssClass: 'mood-tracker-modal',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Selected mood:', data.mood);
    }
  }

 async onVideoOpen(video: any) {
   if(video.post.type =='Byo'){
    return
  }
      let videoData = {
        title: video.postTitle,
        image: video.postImage,
        videoId: video.id,
        video: video.post.media,
        description: '',
      }
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
      data: video
    }
  });
  }
}

