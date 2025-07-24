import { Component, OnInit } from '@angular/core';
import {
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-workout-series-list',
  templateUrl: './workout-series-list.page.html',
  styleUrls: ['./workout-series-list.page.scss'],
  standalone: true,
  imports: [SharedModule,IonSkeletonText]
})
export class WorkoutSeriesListPage implements OnInit {
 imageLoaded:boolean = true;
 workoutList: any[] = [];
  constructor(private apiService: ApiService,private navCtrl: NavController,
     private router: Router) {}

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.apiService.getWorkoutList().subscribe((data: any) => {
      this.workoutList = data.workout;
      this.setFocus()
    });
  }
  setFocus() {
    setTimeout(() => {
      let ele = document.getElementById('workoutseries-card-0');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }
  navigateToFitness(item: any) {
         this.navCtrl.navigateForward(`/workout-day-series/${item.id}`, {
    state: {
      data: item
    }
  });
   /// this.router.navigate(['/workout-day-series/', item.id]);
  }

}
