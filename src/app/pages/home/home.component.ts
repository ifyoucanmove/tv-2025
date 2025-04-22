import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent,
  IonicModule
} from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
    MatCardModule,
    HttpClientModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  categories: Category[] = [];
  isCollapsed = false;
  focusedItem: any = null;
  focusedVideo: any = null;
  searchQuery = '';
  currentVideoIndex = 0;
  videoContainer: HTMLElement | null = null;

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
  programs: any[] = [];
  constructor(
    private contentService: ContentService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

   @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 'ArrowRight') {
      this.slideNext();
    } else if (event.key === 'ArrowLeft') {
      this.slidePrevious();
    }
  } 

  ngOnInit(): void {
    this.loadCategories();
    this.loadUserStats();
    this.loadPrograms();
    // Initialize video container reference after view init
    setTimeout(() => {
      this.videoContainer = document.querySelector('.video-grid');
    }, 0);
  }

  loadPrograms(){
    this.http.get('assets/json/list.json').subscribe((data: any) => {
      this.programs = data;
    });
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

 /*  focusNextItem(event: KeyboardEvent, currentItem: any): void {
    event.preventDefault();
    const items = [...this.menuItems, { icon: 'logout', label: 'logout', route: '' }];
    const currentIndex = items.findIndex(item => item === this.focusedItem);
    const nextIndex = (currentIndex + 1) % items.length;
    this.focusedItem = items[nextIndex];
    console.log(this.focusedItem);
    this.focusElement(this.focusedItem);
  }

  focusPreviousItem(event: KeyboardEvent, currentItem: any): void {
    event.preventDefault();
    const items = [...this.menuItems, { icon: 'logout', label: 'logout', route: '' }];
    const currentIndex = items.findIndex(item => item === this.focusedItem);
    const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
    this.focusedItem = items[prevIndex];
    console.log(this.focusedItem);
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
    console.log(element);
    if (element) {
      const elementRef = document.querySelector(`[data-label="${element.label}"]`);
      if (elementRef) {
        (elementRef as HTMLElement).focus();
      }
    }
  } */

  slideNext(): void {
    if (this.videoContainer && this.currentVideoIndex < this.programs.length - 1) {
      this.currentVideoIndex++;
      this.scrollToVideo();
    }
  }

  slidePrevious(): void {
    if (this.videoContainer && this.currentVideoIndex > 0) {
      this.currentVideoIndex--;
      this.scrollToVideo();
    }
  }

  private scrollToVideo(): void {
    if (this.videoContainer) {
      const videoCard = this.videoContainer.children[this.currentVideoIndex] as HTMLElement;
      if (videoCard) {
        const scrollAmount = this.currentVideoIndex * videoCard.offsetWidth;
        this.videoContainer.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
        // Add focus class
        this.removeFocusFromAllVideos();
        videoCard.classList.add('focused');
      }
    }
  }

  private removeFocusFromAllVideos(): void {
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => card.classList.remove('focused'));
  }
}
