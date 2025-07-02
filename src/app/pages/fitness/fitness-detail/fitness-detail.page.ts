import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { MoodTrackerComponent } from 'src/app/shared/modals/mood-tracker/mood-tracker.component';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
@Component({
  selector: 'app-fitness-detail',
  templateUrl: './fitness-detail.page.html',
  styleUrls: ['./fitness-detail.page.scss'],
  standalone: true,
  imports: [SharedModule, VideoSectionComponent],
})
export class FitnessDetailPage implements OnInit {
  fitnessId: any;
  day: any;
  fitnessData: any;
  programs: any[] = [];
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public apiService: ApiService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.fitnessId = params.id;
      this.day = params.day;
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
    this.apiService.getFitnessList().subscribe((data: any) => {
      this.programs = data;
      this.fitnessData = this.programs.find(
        (item: any) => item.id === this.fitnessId
      );
      this.fitnessData = this.fitnessData.days.find(
        (item: any) => item.day === this.day
      );
      console.log(this.fitnessData);
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
    this.router.navigate(['/program/', video.id]);
  }
}
