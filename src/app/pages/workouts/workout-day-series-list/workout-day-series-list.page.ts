import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular/standalone';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { NavController } from '@ionic/angular';
import {
  IonSkeletonText,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-workout-day-series-list',
  templateUrl: './workout-day-series-list.page.html',
  styleUrls: ['./workout-day-series-list.page.scss'],
  standalone: true,
  imports: [SharedModule,IonSkeletonText]
})
export class WorkoutDaySeriesListPage implements OnInit {

   data:any;
   workoutDay: any =[];
     imageLoaded:boolean = true;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,private navCtrl: NavController,
    private router: Router,    private modalController: ModalController
  ) {
         const navigation = this.router.getCurrentNavigation();
   if (navigation?.extras.state) {
    const data:any = navigation.extras.state;
    this.data = data.data;
    console.log(data,"ss"); 
  }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
     this.loadWorkoutList(params['id']);
    }); 
  }

  loadWorkoutList(id: string) {
      this.apiService.getProgramItems(id).subscribe((data: any) => {
 console.log(data)
 this.workoutDay = data.items;
 this.setFocus()
    })
 
  }
    setFocus() {
    setTimeout(() => {
      let ele = document.getElementById('workoutday-series-card-0');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }


      openDetailPage(item:any){
        this.navCtrl.navigateForward(`/workout-series-detail/${item.id}`, {
    state: {
      data: item,
      programTitle: this.data.title
    }
  });
      }
}
