import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
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
  programs: any[] = [];
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public apiService: ApiService,
    private modalCtrl: ModalController
  ) {}

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
    this.apiService.getProgrammList().subscribe((data: any) => {
      this.programs = data;
      this.videoData = data.find((item: any) => item.id === this.videoId);
      console.log(this.videoData);
    });
  }
  /*   async openMoodTracker() {
    const modal = await this.modalCtrl.create({
      component: MoodTrackerModal,
      cssClass: 'mood-tracker-modal'
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Selected mood:', data.mood);
    }
  } */

  async onVideoOpen(video: any) {
    try {
      const modal = await this.modalCtrl.create({
        component: VideoPlayerComponent,
        componentProps: {
          video: video,
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

  onViewAllVideo(): void {
    // Handle view all click
    console.log('View all clicked');
  }

  async onVideoClick(video: any) {
    this.router.navigate(['/challenge-video-details/', video.id]);
  }
}
