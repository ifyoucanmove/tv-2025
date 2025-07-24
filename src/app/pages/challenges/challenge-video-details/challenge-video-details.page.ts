import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
import { MoodTrackerComponent } from 'src/app/shared/modals/mood-tracker/mood-tracker.component';
import { image } from 'ionicons/icons';
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
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public apiService: ApiService,
    private modalCtrl: ModalController
  ) {
      const navigation = this.router.getCurrentNavigation();
         console.log(navigation,"navigation");
  if (navigation?.extras.state) {
    const data:any = navigation.extras.state;
    this.videoData = data.data;
    console.log(data,"ss"); 
  }
  }

  ngOnInit() {
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
    this.challenges =          res.challenges.map((ele:any) => {
                  return {
                    id:ele.id,
                    image: ele.dashBannerUrl,
                    title: ele.dashTitle,
                    duration: '20'
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
    let videoData = {
      title: video.title1,
      image: video.image,
      videoId: video.id,
      video: video.url,
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
 onViewAllChallenges(): void {
    this.router.navigate(['/challenge-list']);
  }

  onCardChallenges(video: any): void {
    this.router.navigate(['/challenge-detail/', video.id]);
  }
 
}
