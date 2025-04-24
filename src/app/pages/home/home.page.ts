import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
import { Router } from '@angular/router';
import {  ModalController } from '@ionic/angular/standalone';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [HttpClientModule, SharedModule,VideoPlayerComponent, VideoSectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  weeklyStats = {
    thisWeek: {
      daysCompleted: 4,
      totalDays: 5,
      minutesCompleted: 75
    },
    lastWeek: {
      daysCompleted: 3,
      totalDays: 5,
      minutesCompleted: 115
    }
  };
  programs: any[] = [];

  constructor(private http: HttpClient,private modalController: ModalController,
    private router: Router) { }

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.http.get('assets/json/list.json').subscribe((data: any) => {
      this.programs = data;
    });
  }

  getProgressStyle(completed: number, total: number): object {
    const percentage = (completed / total) * 100;
    return {
      'background': `conic-gradient(
        var(--accent-primary) 0deg, 
        var(--accent-secondary) ${percentage * 3.6}deg,
        #1a1a1a ${percentage * 3.6}deg,
        #1a1a1a 360deg
      )`
    };
  }

  onViewAllVideo(): void {
    // Handle view all click
    console.log('View all clicked');
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
  onViewAllChallenges(): void {
    this.router.navigate(['/challenge-list']);
  }

  onCardChallenges(video: any): void {
    this.router.navigate(['/challenge-detail']);
  }
  onViewAllFitness(): void {
    this.router.navigate(['/fitness-list']);

  }

  onCardFitness(video: any): void {
    this.router.navigate(['/fitness-detail']);
  }
  recentlyCompleted(): void {
    console.log('recentlyCompleted');
    alert('recentlyCompleted');
  }
}
