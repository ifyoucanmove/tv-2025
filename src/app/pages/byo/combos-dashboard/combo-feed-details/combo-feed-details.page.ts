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

@Component({
  selector: 'app-combo-feed-details',
  templateUrl: './combo-feed-details.page.html',
  styleUrls: ['./combo-feed-details.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ComboFeedDetailsPage implements OnInit {
  comboDetails: any;
  title: string = '';
  id: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.title = params['title'];
      this.id = params['id'];
      this.apiService.getComboFeedDetails().subscribe((data: any) => {
        this.comboDetails = data.filter((ele: any) => ele.id == this.id)[0];
        console.log(this.comboDetails);
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

  async share(): Promise<void> {
    try {
      await navigator.share({ title: 'testing', url: 'sdc' });
      console.log('Content shared successfully');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
}
