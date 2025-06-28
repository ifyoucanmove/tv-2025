import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [SharedModule, VideoSectionComponent],
})
export class HomePage implements OnInit {
  weeklyStats = {
    thisWeek: {
      daysCompleted: 4,
      totalDays: 5,
      minutesCompleted: 75,
    },
    lastWeek: {
      daysCompleted: 3,
      totalDays: 5,
      minutesCompleted: 115,
    },
  };
  programs: any[] = [];
  workouts: any[] = [];
  fitness: any[] = [];
  challenges: any[] = [];

  //  programs = signal<any[]>([]);
  //  topVideosTitle = signal<string>('Top Videos');
  // tabIndex = signal<number>(1);
  constructor(
    public authService: AuthService,
    public router: Router,
    public apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getProgrammList().subscribe((res: any) => {
      this.programs = res;
      console.log(this.programs, 'pp');
    });

    this.apiService.getChallengeList().subscribe((res: any) => {
      this.challenges = res;
    });
    this.apiService.getFitnessList().subscribe((res: any) => {
      this.fitness = res;
    });
    this.apiService.getWorkoutList().subscribe((res: any) => {
      this.workouts = res;
    });
  }

  getProgressStyle(completed: number, total: number): object {
    const percentage = (completed / total) * 100;
    return {
      background: `conic-gradient(
        var(--accent-primary) 0deg, 
        var(--accent-secondary) ${percentage * 3.6}deg,
        #1a1a1a ${percentage * 3.6}deg,
        #1a1a1a 360deg
      )`,
    };
  }
  recentlyCompleted(): void {
    console.log('recentlyCompleted');
    alert('recentlyCompleted');
  }

  onViewAllVideo(): void {
    // Handle view all click
    console.log('View all clicked');
    this.router.navigate(['/challenge-list']);
  }

  async onVideoClick(video: any) {
    this.router.navigate(['/challenge-video-details/', video.id]);
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
  onViewAllWorkouts(): void {
    this.router.navigate(['/workout-list']);
  }
  onCardWorkouts(video: any): void {
    this.router.navigate(['/workout-detail']);
  }
}
