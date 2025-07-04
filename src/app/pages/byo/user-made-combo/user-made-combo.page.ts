import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-user-made-combo',
  templateUrl: './user-made-combo.page.html',
  styleUrls: ['./user-made-combo.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class UserMadeComboPage implements OnInit {
  userMadeList: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadUserMade();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      let ele = document.getElementById('user-made-card-0');
      if (ele) {
        ele.focus();
      }
    }, 2000);
  }
  loadUserMade() {
    this.apiService.getUserMadeCombo().subscribe((data: any) => {
      this.userMadeList = data;
    });
  }

  navigateToComboDetails(item: any) {
    this.router.navigate(['/combo-details'], {
      queryParams: { id: item.id, title: item.title },
    });
  }
}
