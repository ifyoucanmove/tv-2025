import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-fitness-list',
  templateUrl: './fitness-list.page.html',
  styleUrls: ['./fitness-list.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class FitnessListPage implements OnInit {
  fitnessList: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.apiService.getFitnessList().subscribe((data: any) => {
      this.fitnessList = data['30day'];
    });
  }

  navigateToFitness(item: any) {
    this.router.navigate(['/program/', item.id]);
  }
}
