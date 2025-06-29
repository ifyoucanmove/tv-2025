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
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-byo-combo',
  templateUrl: './byo-combo.page.html',
  styleUrls: ['./byo-combo.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ByoComboPage implements OnInit {
  byoList: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadByo();
  }

  loadByo() {
    this.apiService.getByoList().subscribe((data: any) => {
      this.byoList = data;
    });
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
