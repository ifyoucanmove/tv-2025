import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.page.html',
  styleUrls: ['./challenge-list.page.scss'],
  standalone: true,
  imports: [HttpClientModule,SharedModule]
})
export class ChallengeListPage implements OnInit {

  challengeList:any[] = [];
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.http.get('assets/json/challenge.json').subscribe((data: any) => {
      this.challengeList = data;
    });
  }
}
