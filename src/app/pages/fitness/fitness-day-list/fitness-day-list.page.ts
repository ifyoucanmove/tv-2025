import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-fitness-day-list',
  templateUrl: './fitness-day-list.page.html',
  styleUrls: ['./fitness-day-list.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class FitnessDayListPage implements OnInit {
  fitnessDay: any;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadFitnessList(params['id']);
    });
  }

  loadFitnessList(id: string) {
    this.apiService.getFitnessList().subscribe((data: any) => {
      this.fitnessDay = data.filter((item: any) => item.id === id);
      this.fitnessDay = this.fitnessDay[0];
    });
  }
  navigateToFitness(item: any) {
    this.router.navigate(['/fitness-detail'], {
      queryParams: { id: item.id, day: item.day },
    });
  }
}
