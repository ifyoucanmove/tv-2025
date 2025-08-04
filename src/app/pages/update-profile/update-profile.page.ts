import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { SubscribeDialogComponent } from 'src/app/shared/modals/subscribe-dialog/subscribe-dialog.component';
import { ModalController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class UpdateProfilePage implements OnInit {
  profileData: any;
  subscriptionData:any;
    http: HttpClient = inject(HttpClient);
    subscriptionCancellationData:any;
     plan: string = ''; 
      status: string = '';
  constructor(private router: Router,public authService:AuthService,
    public apiService:ApiService,private modalCtrl: ModalController
  ) {}

  ngOnInit() {
   this.profileData = this.authService.userObjData;
   console.log(this.profileData ,"this.profileData ")
     this.status = this.authService.customer().status;
   this.getSubscriptionData();
   this.getSubscriptionCancelData();
    switch (this.authService.customer().subType) {
        case "month":
          this.plan = "Monthly";
          break;
        case "annual":
          this.plan = "Annual";
          break;
        default:
          break;
      }
  }
get isPaused() {
    return this.authService.customer()?.paddle_status == 'paused'
  }


  get isPastDue() {
    return this.authService.customer()?.paddle_status == 'past_due'
  }
async getSubscriptionData() {
  console.log(this.authService.customer())
    if (this.authService.customer().subscription_id) {
     let url
      if (this.authService.customer()._isPaddleBillingV2) {
        url = "https://us-central1-ifyoucanmove-dev.cloudfunctions.net/paddleUserGetBySubscriptionIdV2";
      } else {
        url = "https://us-central1-ifyoucanmove-dev.cloudfunctions.net/paddleUserGetBySubscriptionId";
      }
      this.http.post(url, {
        subscription_id: this.authService.customer().subscription_id
      }).subscribe({
        next: (res: any) => {
          this.subscriptionData = res.response[0];
       console.log(this.subscriptionData,"subscriptionData")
        },
        error: (error) => {
        //  this.loading = false;
         
        }
      });
    }
  }

getSubscriptionCancelData(){
  this.apiService.getSubscriptionCancellationData().subscribe((res:any) =>{
    console.log(res,"re")
     if (res.length > 0) {
        this.subscriptionCancellationData = res[0];
      } else {
        this.subscriptionCancellationData = null;
      }
  })
}

openManage(){
    let link = 'https://ifyoucanmove.com/update-plan-select?isFromMobile=true';
  window.open(link, '_blank');
/*   let link = 'https://ifyoucanmove.com/update-plan-select?isFromMobile=true'
  this.router.navigate([link]); */
}

  async openSubscribeDialog() {
      const modal = await this.modalCtrl.create({
        component: SubscribeDialogComponent,
        componentProps: {
          title: 'Confirm',
          message: 'Scan QR code to manage your subscriptions.',
         type:'manage'
        },
        cssClass: 'confirm-modal',
      });
  
      await modal.present();
  
      const { data } = await modal.onWillDismiss();
      if (data) {
      
      }
    }

}
