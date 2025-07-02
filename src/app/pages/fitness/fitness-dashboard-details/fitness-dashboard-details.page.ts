import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-fitness-dashboard-details',
  templateUrl: './fitness-dashboard-details.page.html',
  styleUrls: ['./fitness-dashboard-details.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class FitnessDashboardDetailsPage implements OnInit {
  data: any;
  constructor(public apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getFitnessDashboardDetails().subscribe((res) => {
      this.data = res;
    });
  }
}
