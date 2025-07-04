import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, ModalController } from '@ionic/angular/standalone';
import { CommonService } from './services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(public commonService: CommonService,public modalController: ModalController
    ,public router: Router) {}

   async ngOnInit() {
   this.initializeBackButtonHandler();
  }
    initializeBackButtonHandler() {
    document.addEventListener('ionBackButton',async (ev:any) => {
    const currentUrl = this.router.url;
    const topModal = await this.modalController.getTop();
     if(topModal){
      ev.detail.register(10, () => {
        topModal.dismiss();
      });
      return;
     }
     
      else if(currentUrl.includes('home')){
        return
      }
      else{
        console.log("back historys")
        window.history.back();
      }
     
    });
  }  
}
