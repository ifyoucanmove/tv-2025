import { Component, input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ModalController } from '@ionic/angular/standalone';

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
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  console.log(this.data)
  }
  close(){
        this.modalCtrl.dismiss(null);
  
  }

}
