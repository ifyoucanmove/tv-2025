import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-pre-made-combo',
  templateUrl: './pre-made-combo.page.html',
  styleUrls: ['./pre-made-combo.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class PreMadeComboPage implements OnInit {
  preMadeComboList: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadByo();
  }

  loadByo() {
    this.apiService.getPreMadeCombo().subscribe((data: any) => {
      this.preMadeComboList = data;
    });
  }
  navigateToComboDetails(item: any) {
    this.router.navigate(['/combo-details'], {
      queryParams: { id: item.id, title: item.title },
    });
  }
}
