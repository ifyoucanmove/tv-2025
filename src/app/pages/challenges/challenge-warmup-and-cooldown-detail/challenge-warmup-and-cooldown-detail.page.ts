import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular/standalone';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import * as _ from 'lodash';
import { ConfirmPopupComponent } from 'src/app/shared/modals/confirm-popup/confirm-popup.component';
import { MoodListDialogComponent } from 'src/app/shared/modals/mood-list-dialog/mood-list-dialog.component';
import { MoodTrackerComponent } from 'src/app/shared/modals/mood-tracker/mood-tracker.component';
@Component({
  selector: 'app-challenge-warmup-and-cooldown-detail',
  templateUrl: './challenge-warmup-and-cooldown-detail.page.html',
  styleUrls: ['./challenge-warmup-and-cooldown-detail.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ChallengeWarmupAndCooldownDetailPage implements OnInit {
  videoData: any;
  challengeId: any;
  category:any;
    groupBydata: any = {};
      title = '';
 constructor(
    private route: ActivatedRoute,
    public router: Router,
    public authService: AuthService,
    public apiService: ApiService,
    private modalCtrl: ModalController,
    public commonService:CommonService
  ) {
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation, 'navigation');
    if (navigation?.extras.state) {
      const data: any = navigation.extras.state;
      this.videoData = data.data;
      this.challengeId = data.challengeId;
      this.category = data.category;
      this.title = data.challengeName;
      console.log(data, 'ss');
    }
  }

  ngOnInit(): void {
    this.loadWatchData()
    setTimeout(() => {
     
      let ele = document.getElementById('play-btn');
      if (ele) {
        ele.focus();
      }
    }, 3000);
  }
   ionViewDidEnter() {
    setTimeout(() => {
     
      let ele = document.getElementById('play-btn');
       console.log(ele,"col")
      if (ele) {
        ele.focus();
      }
    }, 3000);
  }
  loadWatchData(){
    let data = {
      userId: this.authService.userObjData.email,
      challengeId:this.challengeId,
      category:this.category
    }
    
      this.apiService.geWatchCompletedDataOfCoolDownOrWarmUp(data).subscribe(res =>{
      this.groupBydata = _.groupBy(res, 'title');
    })
  }
 async onVideoOpen(video: any) {
    let videoData = {
      title: video.title,
      image: video.image,
      videoId: video.title,
      video: video.media,
      description: '',
    };
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

    getGroupNametemplate(name: any) {
    return name + " - " + this.title;
  }
  getGroupByDataByName(name: any) {
  //  console.log(this.groupBydata,this.getGroupNametemplate(name))
    return this.groupBydata[this.getGroupNametemplate(name)] || [];
  }

  getWatchCount(payload: any[]) {
    return payload?.length??0
    
  }

   async openMoodTracker(day: any,value:any) {
      const modal = await this.modalCtrl.create({
        component: MoodTrackerComponent,
        cssClass: 'mood-tracker-modal',
         componentProps: {data:null},
      });
  
      await modal.present();
  
      const { data } = await modal.onWillDismiss();
      if (data) {
        console.log('Selected mood:', data);
        this.saveMarkAsComplete(day,value,data);
      }
    }
  
    saveMarkAsComplete(name: any, durationMinutes = 0,energyData: any) {
      let obj = {
        category: this.category,
        isCompletedEmails: this.authService.customer().isCompletedEmails ?? false,
        energyData: energyData,
        userId: this.authService.userObjData.email,
        title: this.getGroupNametemplate(name),
        durationMinutes: this.videoData.durationMinutes,
        watchCount: this.getWatchCount(this.groupBydata[this.getGroupNametemplate(name)] || []) + 1,
        isEnergyDataAvailable: energyData ? true : false,
        challengeId: this.challengeId
      };
      console.log(obj);
      if (this.getWatchCount(this.groupBydata[this.getGroupNametemplate(name)] || []) > 0) {
        this.openDialog(obj);
      } else {
        this.apiService.markAsComplete(obj).subscribe((res) => {
          if (res) {
            this.loadWatchData();
          }
        });
      }
    }
  checkMoodIconVisible(day: any): any {
        this.getWatchCount(day)
        if (day && day.length) {
          return true;
        }else{
          return false;
        } 
      }
  async openDialog(watchData: any) {
      const modal = await this.modalCtrl.create({
        component: ConfirmPopupComponent,
        componentProps: {
          // Your data goes here
          title: 'Confirm Action',
          message: 'Are you sure you want to mark this video as complete again?',
          confirmText: 'Yes',
          cancelText: 'No',
        },
        cssClass: 'confirm-modal',
      });
  
      await modal.present();
  
      const { data } = await modal.onWillDismiss();
      if (data) {
        console.log('Selected:', data);
        this.apiService.markAsComplete(watchData).subscribe((res) => {
          console.log(res);
        this.loadWatchData();
        });
      }
    }

        async  openMoodList(item:any){
          //  let list = this.watchData.filter(ele => ele.day == item);
         const modal = await this.modalCtrl.create({
          component: MoodListDialogComponent,
     componentProps: {data:item},
     cssClass: 'mood-list-dialog'
         })
         await modal.present();
    
        const { data } = await modal.onWillDismiss();
        if (data) {
           this.loadWatchData();
        }
          
        }
}
