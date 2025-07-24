import { Component, OnInit } from '@angular/core';
import {
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-byo-combo',
  templateUrl: './byo-combo.page.html',
  styleUrls: ['./byo-combo.page.scss'],
  standalone: true,
  imports: [SharedModule,IonSkeletonText],
})
export class ByoComboPage implements OnInit {
  byoList: any[] = [];
    imageLoaded:boolean = true;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadByo();
  }

  loadByo() {
    this.apiService.getByoList().subscribe((data: any) => {
      this.byoList = data;
      this.setFocus()
    });
  }
    setFocus() {
    setTimeout(() => {
      let ele = document.getElementById('byo-card-0');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
