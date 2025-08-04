import { Component, input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ModalController } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { CommonService } from 'src/app/services/common.service';
import { MoodTrackerComponent } from '../mood-tracker/mood-tracker.component';

@Component({
  selector: 'app-mood-list-dialog',
  standalone:true,
  imports:[SharedModule],
  templateUrl: './mood-list-dialog.component.html',
  styleUrls: ['./mood-list-dialog.component.scss'],
})
export class MoodListDialogComponent  implements OnInit {
    moods:any = {
    'Happy': '😊',
    'Sad': '😢',
    'Defeated': '😔',
    'Anxious': '😰',
    'Confident': '😎',
    'Overwhelmed': '😩',
    'Excited': '🤗'
  };
  data: any = input<any>({});
  constructor(private modalCtrl: ModalController,public commonService:CommonService,
    public apiService:ApiService) { }

  ngOnInit() {
  console.log(this.data)
  }
  close(){
    this.modalCtrl.dismiss(null);
  }

  async openMoodTracker(item:any) {
      const modal = await this.modalCtrl.create({
        component: MoodTrackerComponent,
        cssClass: 'mood-tracker-modal',
        componentProps: {data: item}
      });
  
      await modal.present();
  
      const { data } = await modal.onWillDismiss();
      if (data) {
        console.log('Selected mood:', data);
        this.edit(item.id,data);
      }
    }

  edit(id:any,data:any){

      this.apiService.updateMarkAsComplete(id,{energyData:data}).subscribe(res =>{
      //  this.commonService.showToast('','Update Succesfully')
       this.modalCtrl.dismiss(true);
        },err=>{
          this.commonService.showToast('','Error Occured')
        })
  }

   async openDeleteConfirmDialog(item: any) {
      const modal = await this.modalCtrl.create({
        component: ConfirmPopupComponent,
        componentProps: {
          // Your data goes here
          title: 'Confirm Action',
          message: 'Are you sure you want to delete?',
          confirmText: 'Yes',
          cancelText: 'No',
        },
        cssClass: 'confirm-modal',
      });
  
      await modal.present();
  
      const { data } = await modal.onWillDismiss();
      if (data) {
        console.log('Selected:', data);
        this.apiService.deleteMarkAsComplete(item.id).subscribe(res =>{
      //  this.commonService.showToast('','Delete Succesfully')
        this.modalCtrl.dismiss(true);
        },err=>{
        this.commonService.showToast('','Error Occured')
        })
      }
    }

}
