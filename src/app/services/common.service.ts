import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  loader = false;
  constructor(private toastController: ToastController) {}

  /* loader */
  showLoader() {
    setTimeout(() => {
      this.loader = true;
    }, 100);
  }

  hideLoader() {
    setTimeout(() => {
      this.loader = false;
    }, 100);
  }

  async showToast(title: string, msg: any) {
    const toast = await this.toastController.create({
      header: title,
      message: msg,
      duration: 3000,
      cssClass: 'top-right-toast',
      /* icon: 'information-circle', */
      position: 'top',
      /*  buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            console.log('Toast dismissed');
          }
        }
      ] */
    });
    toast.present();
  }
}
