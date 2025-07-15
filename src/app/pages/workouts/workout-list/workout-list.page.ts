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
   this.apiService.getCategoriesList().subscribe((res: any) => {
   this.workoutList = res.categories['workouts'].map((ele:any) => {
                  return {
                    id:ele.id,
                    image: ele.imagePath,
                    title: ele.title
                  }
                 })
                 console.log( res," res")
    });
  }

  navigateToFitness(item: any) {
    this.router.navigate(['/workout-day/', item.id]);
  }
}
