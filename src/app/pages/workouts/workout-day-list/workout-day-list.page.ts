import { Component, OnInit } from '@angular/core';
import {
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { ModalController } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-workout-day-list',
  templateUrl: './workout-day-list.page.html',
  styleUrls: ['./workout-day-list.page.scss'],
  standalone: true,
  imports: [SharedModule,IonSkeletonText],
})
export class WorkoutDayListPage implements OnInit {
  workoutDay: any =[];
     name:any;
       imageLoaded:boolean = true;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,private navCtrl: NavController,
        private modalController: ModalController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
       this.name = params['id'];
      this.loadWorkoutList(params['id']);
    });
  }

  loadWorkoutList(id: string) {
      this.apiService.getPostByCategory(id).subscribe((data: any) => {
 console.log(data)
 this.workoutDay = data.posts;
  this.setFocus()
    })

  }
    setFocus() {
    setTimeout(() => {
      let ele = document.getElementById('workoutday-card-0');
       if (ele) {
        ele.focus();
      }
    }, 2000);
  }
 

     openDetailPage(item:any){
        this.navCtrl.navigateForward(`/workout-detail/${item.id}`, {
    state: {
      data: item
    }
  });
      }
}
