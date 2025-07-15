import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.page.html',
  styleUrls: ['./challenge-list.page.scss'],
  standalone: true,
  imports: [SharedModule,CommonModule],
})
export class ChallengeListPage implements OnInit {
  challengeList: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.apiService.getChallengeList().subscribe((res: any) => {
     this.challengeList = res.challenges.map((ele:any) => {
                  return {
                      id:ele.id,
                    image: ele.dashBannerUrl,
                    title: ele.dashTitle
                  }
                 })
    });
  }
  onNavigate(video: any) {
  this.router.navigate(['/challenge-detail/', video.id]);
  }
}
