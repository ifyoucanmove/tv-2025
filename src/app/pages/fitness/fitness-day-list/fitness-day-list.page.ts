import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-fitness-day-list',
  templateUrl: './fitness-day-list.page.html',
  styleUrls: ['./fitness-day-list.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class FitnessDayListPage implements OnInit {
  fitnessDay: any=[];
  data:any;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
     private modalController: ModalController
  ) {
     const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras.state) {
    const data:any = navigation.extras.state;
    this.data = data.data;
    console.log(data.data,"ss"); 
  }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadFitnessList(params['id']);
    });
  }

  loadFitnessList(id: string) {
    this.apiService.getProgramItems(id).subscribe((data: any) => {
       console.log(data)
     this.fitnessDay = data.items;
    });
    
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
