import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class FavouritePage implements OnInit {
  favoriteList: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadFavorite();
  }

  loadFavorite() {
    this.apiService.getFavList().subscribe((data: any) => {
      this.favoriteList = data;
    });
  }
}
