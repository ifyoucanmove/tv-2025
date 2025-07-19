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
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-workout-day-list',
  templateUrl: './workout-day-list.page.html',
  styleUrls: ['./workout-day-list.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class WorkoutDayListPage implements OnInit {
  workoutDay: any =[];
     name:any;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
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
    })

  }
  async onVideoClick(video: any) {
      let videoData = {
        title: video.title,
        image: video.image,
        videoId: video.id,
        video: video.media,
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
