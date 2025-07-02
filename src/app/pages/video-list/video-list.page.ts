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
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.page.html',
  styleUrls: ['./video-list.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class VideoListPage implements OnInit {
  videoList: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.apiService.getProgrammList().subscribe((data: any) => {
      this.videoList = data;
    });
  }

  async onNavigate(video: any) {
    this.router.navigate(['/challenge-video-details/', video.id]);
  }
}
