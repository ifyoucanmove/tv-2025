import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-workout-series-list',
  templateUrl: './workout-series-list.page.html',
  styleUrls: ['./workout-series-list.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class WorkoutSeriesListPage implements OnInit {

 workoutList: any[] = [];
  constructor(private apiService: ApiService,private navCtrl: NavController,
     private router: Router) {}

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.apiService.getWorkoutList().subscribe((data: any) => {
      this.workoutList = data.workout;
    });
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
