import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { QrCodeComponent } from 'ng-qrcode';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-subscribe-dialog',
  standalone:true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports:[QrCodeComponent],
  templateUrl: './subscribe-dialog.component.html',
  styleUrls: ['./subscribe-dialog.component.scss'],
})
export class SubscribeDialogComponent  implements OnInit {
  message: any = input<any>({});
  type: any = input<any>();
  qrLink:any;
    loader:boolean = true;
  constructor(private modalCtrl: ModalController,public apiService:ApiService,
    public authService:AuthService) {}

  ngOnInit() {
    console.log(this.message, 'data',this.type);
    this.generateLink(this.authService.userObjData.uid);
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      let ele = document.getElementById('yesbtn');
      if (ele) {
        ele.focus();
      }
    }, 1000);
  }
  onSubmit(type: any) {
    this.modalCtrl.dismiss(type);
  }
   onCancel() {
    this.modalCtrl.dismiss(null);
  }

   async generateLink(uid : string) : Promise<string>{

    return new Promise<string>((resolve,reject)=>{
    this.authService.generateToken(uid).subscribe((res : any)=>{
      if(this.type == 'plan-select'){
       this.qrLink = `https://ifyoucanmove.com/login-from-mobile?token=${res.token}&email=${this.authService.userObjData.email}&page=subscribe`

      }
      else{
         this.qrLink = `https://ifyoucanmove.com/login-from-mobile?token=${res.token}&email=${this.authService.userObjData.email}&page=manage_subscription`
      }
         console.log("this.qrLink", this.qrLink);
      this.loader = false;
     },(err=>{
          console.log("Err token", err);
           this.loader = false;
          reject(err);

        }))
    
    })

  }
}
