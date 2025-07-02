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
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MoodTrackerComponent } from 'src/app/shared/modals/mood-tracker/mood-tracker.component';
import { ModalController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-combo-details',
  templateUrl: './combo-details.page.html',
  styleUrls: ['./combo-details.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ComboDetailsPage implements OnInit {
  comboDetailsList: any[] = [];
  title: string = '';
  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.title = params['title'];
      this.apiService.getComboDetails().subscribe((data) => {
        this.comboDetailsList = data;
      });
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      let ele = document.getElementById('combo-details-card-0');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }

  async openMoodTracker() {
    const modal = await this.modalCtrl.create({
      component: MoodTrackerComponent,
      cssClass: 'mood-tracker-modal',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Selected mood:', data.mood);
    }
  }
}
