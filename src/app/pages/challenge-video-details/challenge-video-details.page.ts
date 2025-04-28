import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, heart, heartOutline, checkmarkDoneCircleOutline } from 'ionicons/icons';
import {  ModalController } from '@ionic/angular/standalone';
import { MoodTrackerModal } from 'src/app/shared/modals/mood-tracker/mood-tracker.modal';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
@Component({
  selector: 'app-challenge-video-details',
  templateUrl: './challenge-video-details.page.html',
  styleUrls: ['./challenge-video-details.page.scss'],
  standalone: true,
  imports: [SharedModule, HttpClientModule,MoodTrackerModal,VideoSectionComponent]
})
export class ChallengeVideoDetailsPage implements OnInit {

  videoId: any;
  videoData: any;
  programs:any[] = [];
  constructor(private route: ActivatedRoute,public router: Router,
    public http:HttpClient, private modalCtrl: ModalController) {
    addIcons({ checkmarkCircleOutline, heart, heartOutline, checkmarkDoneCircleOutline });
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.videoId = params.id;
      this.loadVideo();
    });
  }

  loadVideo() {
    this.http.get(`assets/json/list.json`).subscribe((data: any) => {
      this.programs = data;
      this.videoData = data.find((item: any) => item.id === this.videoId);
      console.log(this.videoData);
    });
  }
  async openMoodTracker() {
    const modal = await this.modalCtrl.create({
      component: MoodTrackerModal,
      cssClass: 'mood-tracker-modal'
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Selected mood:', data.mood);
      // Handle the selected mood here
    }
  }

  async onVideoOpen(video: any) {
    try {
      const modal = await this.modalCtrl.create({
        component: VideoPlayerComponent,
        componentProps: {
          video: video
        },
        cssClass: 'video-player-modal',
        showBackdrop: true,
        backdropDismiss: true
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
    this.router.navigate(['/challenge-video-details/',video.id]);
  }
}
