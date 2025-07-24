import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  IonSkeletonText,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.page.html',
  styleUrls: ['./workout-list.page.scss'],
  standalone: true,
  imports: [SharedModule,IonSkeletonText],
})
export class WorkoutListPage implements OnInit {
  workoutList: any[] = [];
   imageLoaded:boolean = true;
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
             this.setFocus()
    });
  }
  setFocus() {
    setTimeout(() => {
      let ele = document.getElementById('workout-card-0');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }
  navigateToFitness(item: any) {
    this.router.navigate(['/workout-day/', item.id]);
  }
}
