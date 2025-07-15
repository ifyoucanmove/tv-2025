import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.page.html',
  styleUrls: ['./trainer-list.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TrainerListPage implements OnInit {
  trainerList: any[] = [];
  constructor(private apiService: ApiService,  private navCtrl: NavController,
    private router: Router) {}

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
   this.apiService.getCategoriesList().subscribe((res: any) => {
   this.trainerList = res.categories['trainers'];
                 console.log( res," res")
    });
  }

  navigateToFitness(item: any) {
     this.navCtrl.navigateForward('/trainer-details', {
    state: {
      data: item
    }
  });
   // this.router.navigate(['/trainer-detail/', item.id]);
  }
}
