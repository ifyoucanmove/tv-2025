import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MoodTrackerComponent } from 'src/app/shared/modals/mood-tracker/mood-tracker.component';
import { ModalController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmPopupComponent } from 'src/app/shared/modals/confirm-popup/confirm-popup.component';
import { MoodListDialogComponent } from 'src/app/shared/modals/mood-list-dialog/mood-list-dialog.component';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-combo-details',
  templateUrl: './combo-details.page.html',
  styleUrls: ['./combo-details.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ComboDetailsPage implements OnInit {
  comboDetails: any;
  title: string = '';
  id: any;

  watchData: any[] = [];
  isCompleted = false;
  watchCount!: number;
     favList:any=[];
   favDocid:any;
  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private apiService: ApiService,
    public router: Router,
        public commonService:CommonService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    
      this.commonService.loader = true;
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.params['id'];
      console.log(params, this.id);
      this.loadData();
    });
  }

  loadData() {
    this.apiService.getComboDetails(this.id).subscribe((data: any) => {
      this.comboDetails = data;
      console.log(this.comboDetails,"this.comboDetails")
      this.loadWatchData();
      this.getFavList()
    });
  }
  loadWatchData() {
    let data = {
      userId: this.authService.userObjData.email,
      comboId: this.id,
      category: 'byo-combo',
    };
    this.apiService.geCompletetionDataOfByo(data).subscribe((res: any) => {
      console.log(res);
      if (res.length > 0) {
        this.watchData = res;
        this.isCompleted = true;
        this.watchCount = this.getWatchCount();
        this.commonService.loader = false;
      } else {
        this.isCompleted = false;
        this.watchData = [];
        this.commonService.loader = false;
      }
    },err=>{
      this.commonService.loader = false;
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      let ele = document.getElementById('combobtn');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }

  startCombo() {
    this.router.navigate(['/play-combo'], {
      queryParams: { id: this.comboDetails.id, title: this.comboDetails.name },
    });
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
    this.watchCount = this.isCompleted ? this.getMaxWatchCount() : 1;
    let obj = {
      comboId: this.id,
      userId: this.authService.userObjData.email,
      category: 'byo-combo',
      subCategory: this.comboDetails.type,
      title: this.comboDetails.name,
      durationMinutes: this.comboDetails.durationMinutes,
      watchCount: this.isCompleted ? this.getMaxWatchCount() + 1 : 1,
      isCompletedEmails: this.authService.customer().isCompletedEmails ?? false,
      isEnergyDataAvailable: energyData ? true : false,
      energyData: energyData,
    };
    console.log(obj);
    if (this.isCompleted) {
      this.openDialog(obj);
    } else {
      this.apiService.markAsComplete(obj).subscribe((res) => {
        console.log(res);
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
  getWatchCount() {
    const data = this.watchData
      ? this.watchData.filter((res: any) => {
          return res.comboId === String(this.id);
        })
      : [];
    return data.length;
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

   checkMoodIconVisible(): any {
      if (this.watchData && this.watchData.length) {
        const data = this.watchData/* .filter((res) => {
          return res.day === day
        }); */
        if(data.length > 0){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    }
    async  openMoodList(){
    //    let list = this.watchData.filter(ele => ele.day == item);
     const modal = await this.modalCtrl.create({
      component: MoodListDialogComponent,
 componentProps: {data:this.watchData},
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
      let result = this.favList.find((item: any) => item.postId === this.comboDetails.id);
      if(result){
 this.favDocid = result.docid;
      }
     
      console.log(this.favDocid ,"this.favDocid ")
    })
    }

    addTofav(){
      let obj=
      {
    "id": this.comboDetails.id,
    "postId": this.comboDetails.id,
    "email": this.authService.userObjData.email,
    "title": this.comboDetails.name,
    "image": "",
    "type":  "byo-combo",
    "media":""
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
      ? favoriteList.filter((item: any) => item.postId === this.comboDetails.id).length
      : favoriteList;
    }
}
