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

@Component({
  selector: 'app-play-combo',
  templateUrl: './play-combo.page.html',
  styleUrls: ['./play-combo.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class PlayComboPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
