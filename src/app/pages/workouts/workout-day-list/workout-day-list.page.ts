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
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-workout-day-list',
  templateUrl: './workout-day-list.page.html',
  styleUrls: ['./workout-day-list.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class WorkoutDayListPage implements OnInit {
  workoutDay: any;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadWorkoutList(params['id']);
    });
  }

  loadWorkoutList(id: string) {
    this.apiService.getWorkoutList().subscribe((data: any) => {
      this.workoutDay = data.filter((item: any) => item.id === id);
      this.workoutDay = this.workoutDay[0];
    });
  }
  navigateToFitness(item: any) {
    this.router.navigate(['/workout-detail'], {
      queryParams: { id: item.id, day: item.day },
    });
  }
}
