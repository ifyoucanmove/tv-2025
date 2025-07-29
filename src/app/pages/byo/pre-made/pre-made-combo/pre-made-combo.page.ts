import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadByo();
  }

  loadByo() {
    this.apiService.getPreMadeCombo().subscribe((data: any) => {
      this.preMadeComboList = data.combos;
      this.setFocus();
    });
  }
  setFocus() {
    setTimeout(() => {
      let ele = document.getElementById('pre-made-card-0');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }
  navigateToComboDetails(item: any) {
    this.router.navigate(['/combo-details', item.id]);
  }
}
