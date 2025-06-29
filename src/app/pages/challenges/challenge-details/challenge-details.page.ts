import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-challenge-details',
  templateUrl: './challenge-details.page.html',
  styleUrls: ['./challenge-details.page.scss'],
  standalone: true,
  imports: [SharedModule, VideoSectionComponent],
})
export class ChallengeDetailsPage implements OnInit {
  challenges: any[] = [];
  constructor(
    private apiService: ApiService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.apiService.getChallengeList().subscribe((data: any) => {
      this.challenges = data;
    });
  }
  onViewAllChallenges(): void {
    this.router.navigate(['/challenge-list']);
  }
  async onVideoClick(video: any) {
    try {
      const modal = await this.modalController.create({
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
}
