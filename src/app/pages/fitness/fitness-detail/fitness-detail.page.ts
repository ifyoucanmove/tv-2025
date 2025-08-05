import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { VideoPlayerComponent } from 'src/app/shared/video-player/video-player.component';
import { MoodTrackerComponent } from 'src/app/shared/modals/mood-tracker/mood-tracker.component';
import { VideoSectionComponent } from 'src/app/shared/video-section/video-section.component';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmPopupComponent } from 'src/app/shared/modals/confirm-popup/confirm-popup.component';
import { MoodListDialogComponent } from 'src/app/shared/modals/mood-list-dialog/mood-list-dialog.component';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-fitness-detail',
  templateUrl: './fitness-detail.page.html',
  styleUrls: ['./fitness-detail.page.scss'],
  standalone: true,
  imports: [SharedModule, VideoSectionComponent],
})
export class FitnessDetailPage implements OnInit {
  programId: any;
  day: any;
  fitnessData: any;
  programData: any;
  data: any;
  programs: any[] = [];

  repeatCount!: number;
  watchData: any[] = [];
  lastWatched: any[] = [];
  isCompleted = false;
   status!: string;
     favList:any=[];
   favDocid:any;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private navCtrl: NavController,
    public apiService: ApiService,
    public authService: AuthService,
    private modalCtrl: ModalController,
    public commonService:CommonService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const data: any = navigation.extras.state;
      this.fitnessData = data.fitnessData;
      this.programData = data.programData;
      this.day = data.programData.dayNumber;
      console.log(data, 'ss');
    }
  }

  ngOnInit() {
    this.getFavList()
        const customerValue = this.authService.customer();
      if (customerValue) {
        this.status = customerValue.status;
           if (!customerValue) {
            this.status = "";
          }
          if (this.status !== 'active') {
            this.status = 'inactive';
          }
      }
     this.commonService.loader = true;
    this.route.paramMap.subscribe((params: any) => {
      //  this.programId = params.params.id;
      this.programId = this.programData.programId;
      this.loadData();
    });
  }

  loadWatchData() {
    let data = {
      userId: this.authService.userObjData.email,
      programId: this.programId,
      repeatCount: this.repeatCount,
    };
    this.apiService.geCompletetionDataOfSeries(data).subscribe((res: any) => {
      console.log(res);
      if (res.length > 0) {
        this.watchData = res.filter((ele: any) => ele.day == this.day);
        console.log(this.watchData);
        this.getLastWatched(this.watchData);
         this.commonService.loader = false;
      } else {
        this.watchData = [];
         this.commonService.loader = false;
      }
    },err=>{
       this.commonService.loader = false;
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
    console.log(this.authService.customer(), 'customer');
    if (this.authService.customer().programData[this.programId]) {
      this.repeatCount =
        this.authService.customer().programData[this.programId].repeatCount;
    } else {
      this.repeatCount = 0;
    }
    this.apiService.getFitnessList().subscribe((res: any) => {
      this.programs = res['30day'].map((ele: any) => {
        return {
          id: ele.id,
          image: ele.image,
          title: ele.title,
        };
      });
      this.loadWatchData();
    });
  }

  async onVideoOpen(video: any) {
    if (video.post.type == 'Byo') {
      return;
    }
    let videoData = {
      title: video.postTitle,
      image: video.postImage,
      videoId: video.id,
      video: video.post.media,
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

  onViewAllFitness(): void {
    this.router.navigate(['/fitness-list']);
  }

  onCardFitness(video: any): void {
    this.navCtrl.navigateForward(`/program/${video.id}`, {
      state: {
        data: video,
      },
    });
  }

  getLastWatched(watched: any[]) {
    const data = watched.filter((result: { day: string }) => {
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
       componentProps: {data:null},
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Selected mood:', data);
      this.saveMarkAsComplete(data);
    }
  }

  saveMarkAsComplete(energyData: any) {
    this.isCompleted = this.isDayVideoWatched(this.day);
    let obj = {
      category: '30day',
      isCompletedEmails: this.authService.customer().isCompletedEmails ?? false,
      energyData: energyData,
      userId: this.authService.userObjData.email,
      title: this.programData.postTitle,
      programTitle: this.fitnessData.title,
      durationMinutes: this.programData.post.durationMinutes,
      watchCount: this.isCompleted ? this.getDayWatchCount(this.day) + 1 : 1,
      repeatCount: this.repeatCount,
      isEnergyDataAvailable: energyData ? true : false,
      programId: this.programId,
      day: this.day,
    };
    console.log(obj);
    if (this.isCompleted) {
      this.openDialog(obj);
    } else {
      this.apiService.markAsComplete(obj).subscribe((res) => {
        if (res) {
          this.loadWatchData();
        }
      });
    }
  }
  getMaxWatchCount(): number {
    if (!this.watchData) {
      return 0;
    }
    return this.watchData.length;
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
  getDayWatchCount(day: any): any {
    if (this.watchData && this.watchData.length) {
      const data = this.watchData.filter((res) => {
        return res.day === day;
      });
      return data.length;
    }
  }

    checkMoodIconVisible(day: any): any {
        if (this.watchData && this.watchData.length) {
          const data = this.watchData.filter((res) => {
            return res.day === day
          });
          if(data.length > 0){
            return true;
          }else{
            return false;
          }
        }else{
          return false;
        }
      }
      async  openMoodList(item:any){
          let list = this.watchData.filter(ele => ele.day == item);
       const modal = await this.modalCtrl.create({
        component: MoodListDialogComponent,
   componentProps: {data:list},
   cssClass: 'mood-list-dialog'
       })
       await modal.present();
  
      const { data } = await modal.onWillDismiss();
      if (data) {
      }
        
      }

            getFavList(){
    this.apiService.getFavorites(this.authService.userObjData.email).subscribe((res:any) =>{
      console.log(res,"favlist")
      this.favList = res.favorites;
      let result = this.favList.find((item: any) => item.postId === this.programData.postId);
      if(result){
 this.favDocid = result.docid;
      }
     
      console.log(this.favDocid ,"this.favDocid ")
    })
    }

    addTofav(){
      let obj=
      {
    "id": this.programData.id,
    "postId": this.programData.postId,
    "email": this.authService.userObjData.email,
    "title": this.programData.postTitle,
    "image": this.programData.postImage,
    "type": this.programData.post.type,
    "media":this.programData.post.media,
    "description": this.programData.post.description,
    "duration": this.programData.post.duration,
    "equipment": this.programData.post.equipment,
    "categories": this.programData.post.categories,
    "categoryArray":this.programData.post.categoryArray,
    "ingredients": this.programData.post.ingredients
}

this.apiService.addFavorites(obj).subscribe(res =>{
  console.log(res)
  this.getFavList()
})

    }

    removeFromFavList(){
      console.log(this.favDocid)
      this.apiService.deleteFavorites(this.favDocid).subscribe(res =>{
      this.getFavList()
      })
    }

    checkFavorites(){
   // let result = this.favList.find(ele => ele.)
     const favoriteList =  this.favList;
     if(!favoriteList ){
  return
     }
    return favoriteList
      ? favoriteList.filter((item: any) => item.postId === this.programData.postId).length
      : favoriteList;
    }
}
