import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavController } from '@ionic/angular';
import { IonSkeletonText } from '@ionic/angular/standalone';
@Component({
  selector: 'app-fitness-list',
  templateUrl: './fitness-list.page.html',
  styleUrls: ['./fitness-list.page.scss'],
  standalone: true,
  imports: [SharedModule, IonSkeletonText],
})
export class FitnessListPage implements OnInit {
  fitnessList: any[] = [];
  imageLoaded: boolean = true;
  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.apiService.getFitnessList().subscribe((data: any) => {
      this.fitnessList = data['30day'];
      this.setFocus();
    });
  }
  setFocus() {
    setTimeout(() => {
      let ele = document.getElementById('fitness-card-0');
      console.log(ele, 'ele');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }
  navigateToFitness(item: any) {
    this.navCtrl.navigateForward(`/program/${item.id}`, {
      state: {
        data: item,
      },
    });
    // this.router.navigate(['/program/', item.id]);
  }
}
