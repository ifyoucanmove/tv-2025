import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';

import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MoodTrackerComponent } from 'src/app/shared/modals/mood-tracker/mood-tracker.component';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmPopupComponent } from 'src/app/shared/modals/confirm-popup/confirm-popup.component';
@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.page.html',
  styleUrls: ['./workout-detail.page.scss'],
  standalone: true,
  imports: [SharedModule, VideoSectionComponent],
})
export class WorkoutDetailPage implements OnInit {
  programId: any;
  data: any;
  workouts: any[] = [];

  postId:any;
   watchData: any[] = [];
    lastWatched: any[] = [];
      isCompleted = false;
      day:any;
      programTitle:any='';
  constructor(
    private route: ActivatedRoute,
    public router: Router,private navCtrl: NavController,
    public apiService: ApiService,public authService:AuthService,
    private modalCtrl: ModalController
  ) {
       const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras.state) {
    const data:any = navigation.extras.state;
    this.data = data.data;
    console.log(data.data,"ss"); 
  }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      this.programId = params.params.id;
      this.loadData();
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      let ele = document.getElementById('play-btn');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      console.log('ionViewDidEnter');
      let ele = document.getElementById('play-btn');
      if (ele) {
        ele.focus();
      }
    }, 3000);
  }

  loadData() {
       console.log(this.authService.customer(),"customer")
 
 this.apiService.getCategoriesList().subscribe((res: any) => {
   this.workouts = res.categories['workouts'].map((ele:any) => {
                  return {
                    id:ele.id,
                    image: ele.imagePath,
                    title: ele.title
                  }
                 })
              this.loadWatchData()
    });
  }
    loadWatchData(){
    let data={
   "userId": this.authService.userObjData.email,
 "postId":this.programId,
 "category":"workouts"
 }
  this.apiService.geCompletetionDataOfWorkout(data).subscribe((res:any) => {
      console.log(res)
        if (res.length > 0) {
            this.watchData = res.filter((ele:any) => ele.day == this.day);
            console.log(this.watchData)
              this.getLastWatched(this.watchData);
          } else {
            this.watchData = [];
          }
    }) 

  }

 async onVideoOpen(video: any) {
   if(video.type =='Byo'){
    return
  }
      let videoData = {
        title: video.title,
        image: video.image,
        videoId: video.id,
        video: video.media,
        description: '',
      }
      try {
        const modal = await this.modalCtrl.create({
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

 onViewAllWorkouts(): void {
    this.router.navigate(['/workout-list']);
  }
   onCardWorkouts(video: any): void {
   this.router.navigate(['/workout-day/', video.id]);
  }

  
       getLastWatched(watched: any[]) {
        const data = watched.filter((result: { day: string; }) => {
          return result.day === String(this.day);
        });
        if (data.length > 1) {
          data.sort((a: any, b: any) => {
            return a.date - b.date;
          });
        }
        this.lastWatched = data;
      }
       isDayVideoWatched(day: any) {
        const data = this.watchData.filter((res) => {
          return res.day == day;
        });
        if (data.length > 0) {
          return true;
        } else {
          return false;
        }
      }
      async openMoodTracker() {
        const modal = await this.modalCtrl.create({
          component: MoodTrackerComponent,
          cssClass: 'mood-tracker-modal',
        });
    
        await modal.present();
    
        const { data } = await modal.onWillDismiss();
        if (data) {
          console.log('Selected mood:', data);
          this.saveMarkAsComplete(data)
        }
      }
    
      saveMarkAsComplete(energyData:any){
      this.isCompleted = this.isDayVideoWatched(this.day);
      let obj = {
         category:  "workouts",
           isCompletedEmails: this.authService.customer().isCompletedEmails??false,
         date: new Date(),
        energyData: energyData,
          userId: this.authService.userObjData.email,
      title: this.data.title,
      durationMinutes: this.data.durationMinutes,
      watchCount: this.isCompleted ? this.getDayWatchCount(this.day) + 1 : 1,
     isEnergyDataAvailable: energyData ? true : false,
     postId: this.programId,
      day: this.day,    
      }
      console.log(obj)
      if (this.isCompleted) {
            this.openDialog(obj);
          } 
          else{
     this.apiService.markAsComplete(obj).subscribe(res =>{
        console.log(res)
      })
          }
     
      }
      getMaxWatchCount(): number {
        if(!this.watchData){
          return 0
        }
        return this.watchData.length;
        
      }
      
         async openDialog(watchData: any) {
             const modal = await this.modalCtrl.create({
            component: ConfirmPopupComponent,
           componentProps: {
          // Your data goes here
          title: 'Confirm Action',
          message: "Are you sure you want to mark this video as complete again?",
          confirmText: 'Yes',
          cancelText: 'No'
        },
         cssClass: 'confirm-modal',
          });
      
          await modal.present();
      
          const { data } = await modal.onWillDismiss();
          if (data) {
            console.log('Selected:', data);
            this.apiService.markAsComplete(watchData).subscribe(res =>{
          console.log(res)
            this.loadWatchData()
        })
          }
      
         
        }
       getDayWatchCount(day: any): any {
        if (this.watchData && this.watchData.length) {
          const data = this.watchData.filter((res) => {
            return res.day === day;
          });
          return data.length;
        }
      }
}
