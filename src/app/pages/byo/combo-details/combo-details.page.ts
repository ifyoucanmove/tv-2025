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
  selector: 'app-combo-details',
  templateUrl: './combo-details.page.html',
  styleUrls: ['./combo-details.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ComboDetailsPage implements OnInit {
  comboDetailsList: any[] = [];
  title: string = '';
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

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
}
