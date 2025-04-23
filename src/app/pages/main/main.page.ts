import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { HeaderPage } from 'src/app/shared/header/header.page';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    HeaderPage,
    CommonModule,
    FormsModule
  ]
})
export class MainPage implements OnInit {
  isCollapsed = false;
  focusedItem: any = null;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('mainContent') mainContent!: ElementRef;

  menuItems = [
    { icon: 'home', label: 'Home', route: '/home' },
    { icon: 'search', label: 'Search', route: '/search' },
    { icon: 'favorite', label: 'Favorites', route: '/favorites' },
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'settings', label: 'Settings', route: '/settings' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  logout(): void {
   // this.authService.logout();
    this.router.navigate(['/signin']);
  }
  
  toggleSidenav(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.sidenav) {
      if (this.isCollapsed) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
    }
  }

  onSideNavKeyDown(event: KeyboardEvent): void {
    
    if (event.key === 'ArrowRight') {
      this.isCollapsed = true;
      event.preventDefault();
      // Focus the main content area
      if (this.mainContent) {
        const firstFocusableElement = this.mainContent.nativeElement.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusableElement) {
          firstFocusableElement.focus();
        } else {
          this.mainContent.nativeElement.focus();
        }
      }
    }
  }
  checkEnterFocus(): void {
    if (this.isCollapsed) {
      this.isCollapsed = false;
    }
  }
}

