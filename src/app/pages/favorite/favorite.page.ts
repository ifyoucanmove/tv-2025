import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
  standalone: true,
  imports: [SharedModule,HttpClientModule]
})
export class FavoritePage implements OnInit {

  favoriteList:any[] = [];
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    this.loadFavorite();
  }

  loadFavorite() {
    this.http.get('assets/json/favorite.json').subscribe((data: any) => {
      this.favoriteList = data;
    });
  }
}
