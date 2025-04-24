import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import {  ModalController } from '@ionic/angular/standalone';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
@Component({
  selector: 'app-fitness-detail',
  templateUrl: './fitness-detail.page.html',
  styleUrls: ['./fitness-detail.page.scss'],
  standalone: true,
  imports: [SharedModule,HttpClientModule]
})
export class FitnessDetailPage implements OnInit {
  fitnessList:any[] = [];
  constructor(private http: HttpClient,private modalController: ModalController,
    private router: Router) { }

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.http.get('assets/json/fitness.json').subscribe((data: any) => {
      this.fitnessList = data;
    });
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
