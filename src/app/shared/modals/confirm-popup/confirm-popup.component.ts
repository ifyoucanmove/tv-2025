import { Component, input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent implements OnInit {
  message: any = input<any>({});
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.message, 'data');
  }

  onSubmit(type: any) {
    this.modalCtrl.dismiss(type);
  }
}
