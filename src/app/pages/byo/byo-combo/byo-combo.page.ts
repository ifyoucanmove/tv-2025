import { Component, OnInit } from '@angular/core';
import { IonSkeletonText } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SubscribeDialogComponent } from 'src/app/shared/modals/subscribe-dialog/subscribe-dialog.component';
import { ModalController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-byo-combo',
  templateUrl: './byo-combo.page.html',
  styleUrls: ['./byo-combo.page.scss'],
  standalone: true,
  imports: [SharedModule, IonSkeletonText],
})
export class ByoComboPage implements OnInit {
  byoList: any[] = [];
  imageLoaded: boolean = true;
   status!: string;
  constructor(private apiService: ApiService, private modalCtrl: ModalController,
    public authService:AuthService, private router: Router) {}

  ngOnInit() {
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
    this.loadByo();
  }

  loadByo() {
    this.apiService.getByoList().subscribe((data: any) => {
      this.byoList = data;
      this.setFocus();
    });
  }
  setFocus() {
    setTimeout(() => {
      let ele = document.getElementById('byo-card-0');
      if (ele) {
        ele.focus();
      }
    }, 100);
  }
  navigateTo(route: string) {
   if(this.status == 'active'){
    this.router.navigate([route]);
  }
    else{
    this.openSubscribeDialog()
    }
  }

  async openSubscribeDialog() {
        const modal = await this.modalCtrl.create({
          component: SubscribeDialogComponent,
          componentProps: {
            title: 'Confirm',
            message: 'You must be subscribed to access this content. Scan to activate your subscription.',
            type:'plan-select'
          },
          cssClass: 'confirm-modal',
        });
    
        await modal.present();
    
        const { data } = await modal.onWillDismiss();
        if (data) {
        
        }
      }
}
