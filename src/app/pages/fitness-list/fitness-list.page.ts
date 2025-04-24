import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-fitness-list',
  templateUrl: './fitness-list.page.html',
  styleUrls: ['./fitness-list.page.scss'],
  standalone: true,
  imports: [SharedModule,HttpClientModule]
})
export class FitnessListPage implements OnInit {

  fitnessList:any[] = [];
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.http.get('assets/json/fitness.json').subscribe((data: any) => {
      this.fitnessList = data;
    });
  }
}
