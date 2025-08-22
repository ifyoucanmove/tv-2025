import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { IonSkeletonText } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.page.html',
  styleUrls: ['./challenge-list.page.scss'],
  standalone: true,
  imports: [SharedModule, CommonModule, IonSkeletonText],
})
export class ChallengeListPage implements OnInit {
  challengeList: any[] = [];
  imageLoaded: boolean = true;
  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPrograms();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      let ele = document.getElementById('weekcard0');
      if (ele) {
        ele.focus();
      }
    }, 100);
  }
  loadPrograms() {
    this.apiService.getChallengeList().subscribe((res: any) => {
      this.challengeList = res.challenges.map((ele: any) => {
        return {
          id: ele.id,
          image: ele.dashBannerUrl,
          title: ele.dashTitle,
        };
      });
    });
  }
  onNavigate(video: any) {
    this.navCtrl.navigateForward(`/challenge-detail/${video.id}`, {
      state: {
        data: video.title,
      },
    });
    // this.router.navigate(['/challenge-detail/', video.id]);
  }
}
