import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular/standalone';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
@Component({
  selector: 'app-workout-day-series-list',
  templateUrl: './workout-day-series-list.page.html',
  styleUrls: ['./workout-day-series-list.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class WorkoutDaySeriesListPage implements OnInit {

   data:any;
   workoutDay: any =[];
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,    private modalController: ModalController
  ) {
         const navigation = this.router.getCurrentNavigation();
         console.log(navigation,"navigation");
  if (navigation?.extras.state) {
    const data:any = navigation.extras.state;
    this.data = data.data;
    console.log(data,"ss"); 
  //   this.loadWorkoutList(this.data['id']);
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
    })
 
  }
 async onVideoClick(video: any) {
   if(video.post.type =='Byo'){
    return
  }
      let videoData = {
        title: video.postTitle,
        image: video.postImage,
        videoId: video.id,
        video: video.post.media,
        description: '',
      }
      try {
        const modal = await this.modalController.create({
          component: VideoPlayerComponent,
          componentProps: {
            video: videoData,
          },
          cssClass: 'video-player-modal',
          showBackdrop: true,
          backdropDismiss: true,
        });
  
        await modal.present();
      } catch (error) {
        console.error('Error opening video modal:', error);
      }
    }
}
