import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-challenge-cool-down',
  templateUrl: './challenge-cool-down.page.html',
  styleUrls: ['./challenge-cool-down.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ChallengeCoolDownPage implements OnInit {

  constructor(public apiService:ApiService) { }

  ngOnInit() {
      let data = {
      userId: 'qa2@mentorem.com',
      challengeId:'21-day-21-minutes-june2025',
      category:'challenge-cool-down'
    }
  }

}
