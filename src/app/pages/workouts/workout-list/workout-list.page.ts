import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.page.html',
  styleUrls: ['./workout-list.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class WorkoutListPage implements OnInit {
  workoutList: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.apiService.getWorkoutList().subscribe((data: any) => {
      this.workoutList = data;
    });
  }
}
