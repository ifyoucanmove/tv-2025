import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-combo-dashboard',
  templateUrl: './combo-dashboard.page.html',
  styleUrls: ['./combo-dashboard.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ComboDashboardPage implements OnInit {
  comboFeed: any = [];
  myCombo: any = [];
  constructor(public apiService: ApiService, public router: Router) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.apiService.getComboFeed().subscribe((res) => {
      this.comboFeed = res;
    });
    this.apiService.getComboFeed().subscribe((res) => {
      this.myCombo = res;
    });
  }

  navigateToComboDetails(item: any) {
    this.router.navigate(['/combo-feed-details'], {
      queryParams: { id: item.id, title: item.title },
    });
  }
}
