import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
import {  ModalController } from '@ionic/angular/standalone';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.page.html',
  styleUrls: ['./challenge-detail.page.scss'],
  standalone: true,
  imports: [SharedModule,HttpClientModule,VideoSectionComponent]
})
export class ChallengeDetailPage implements OnInit {

  challenges:any[] = [];
  constructor(private http: HttpClient,private modalController: ModalController,
    private router: Router) { }

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.http.get('assets/json/challenge.json').subscribe((data: any) => {
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
}
