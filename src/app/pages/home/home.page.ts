import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [HttpClientModule, SharedModule, VideoSectionComponent],
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

  constructor(private http: HttpClient) { }

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

  onVideoClick(video: any): void {
    // Handle video click
    console.log('Video clicked:', video);
  }
  onViewAllChallenges(): void {
    // Handle view all click
    console.log('onViewAllChallenges');
  }

  onCardChallenges(video: any): void {
    // Handle video click
    console.log('onCardChallenges', video);
  }
  onViewAllFitness(): void {
    // Handle view all click
    console.log('onViewAllFitness');
  }

  onCardFitness(video: any): void {
    // Handle video click
    console.log('onCardFitness', video);
  }
}
