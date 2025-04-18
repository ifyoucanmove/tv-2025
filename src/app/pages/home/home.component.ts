import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ContentService, Category } from '../../services/content.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  categories: Category[] = [];
  isCollapsed = false;
  focusedItem: any = null;
  focusedVideo: any = null;
  searchQuery = '';

  // Stats
  todayStats = {
    minutesCompleted: 140,
    videosCompleted: 7
  };

  weeklyStats = {
    thisWeek: {
      daysCompleted: 4,
      totalDays: 5,
      minutesCompleted: 75
    },
    lastWeek: {
      daysCompleted: 3,
      totalDays: 5,
      minutesCompleted: 115
    }
  };

  menuItems = [
    { icon: 'home', label: 'Home', route: '/home' },
    { icon: 'search', label: 'Search', route: '/search' },
    { icon: 'favorite', label: 'Favorites', route: '/favorites' },
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'settings', label: 'Settings', route: '/settings' }
  ];

  constructor(
    private contentService: ContentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadUserStats();
  }

  loadCategories(): void {
    this.contentService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }

  loadUserStats(): void {
    // TODO: Implement stats loading from a service
    // This would typically come from a backend service
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    // TODO: Implement search functionality
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  navigateToVideo(video: any): void {
    this.router.navigate(['/video', video.id]);
  }

  focusNextItem(event: KeyboardEvent, currentItem: any): void {
    event.preventDefault();
    const items = [...this.menuItems, { icon: 'logout', label: 'logout', route: '' }];
    const currentIndex = items.findIndex(item => item === this.focusedItem);
    const nextIndex = (currentIndex + 1) % items.length;
    this.focusedItem = items[nextIndex];
    this.focusElement(this.focusedItem);
  }

  focusPreviousItem(event: KeyboardEvent, currentItem: any): void {
    event.preventDefault();
    const items = [...this.menuItems, { icon: 'logout', label: 'logout', route: '' }];
    const currentIndex = items.findIndex(item => item === this.focusedItem);
    const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
    this.focusedItem = items[prevIndex];
    this.focusElement(this.focusedItem);
  }

  focusNextVideo(event: KeyboardEvent): void {
    event.preventDefault();
    const allVideos = this.categories.reduce((acc: any[], category: Category) => [...acc, ...category.videos], []);
    const currentIndex = allVideos.findIndex((video: any) => video === this.focusedVideo);
    const nextIndex = (currentIndex + 1) % allVideos.length;
    this.focusedVideo = allVideos[nextIndex];
    this.focusElement(this.focusedVideo);
  }

  focusPreviousVideo(event: KeyboardEvent): void {
    event.preventDefault();
    const allVideos = this.categories.reduce((acc: any[], category: Category) => [...acc, ...category.videos], []);
    const currentIndex = allVideos.findIndex((video: any) => video === this.focusedVideo);
    const prevIndex = currentIndex <= 0 ? allVideos.length - 1 : currentIndex - 1;
    this.focusedVideo = allVideos[prevIndex];
    this.focusElement(this.focusedVideo);
  }

  focusMenu(): void {
    this.focusedItem = this.menuItems[0];
    this.focusElement(this.focusedItem);
  }

  private focusElement(element: any): void {
    if (element) {
      const elementRef = document.querySelector(`[data-label="${element.label}"]`);
      if (elementRef) {
        (elementRef as HTMLElement).focus();
      }
    }
  }

  handleKeydown(event: KeyboardEvent, item: any): void {
    switch (event.key) {
      case 'ArrowDown':
        this.focusNextItem(event, item);
        break;
      case 'ArrowUp':
        this.focusPreviousItem(event, item);
        break;
      case 'Enter':
        if (item.label === 'logout') {
          this.logout();
        } else {
          this.navigateTo(item.route);
        }
        break;
    }
  }

  handleVideoKeydown(event: KeyboardEvent, video: any): void {
    switch (event.key) {
      case 'ArrowRight':
        this.focusNextVideo(event);
        break;
      case 'ArrowLeft':
        this.focusPreviousVideo(event);
        break;
      case 'ArrowUp':
        this.focusMenu();
        break;
    }
  }
}
