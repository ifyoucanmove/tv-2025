import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchService, SearchResult } from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular/standalone';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class SearchPagePage implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  
  searchKeyword: string = '';
  searchResults: SearchResult[] = [];
  isLoading: boolean = false;
  isDataLoaded: boolean = false;
  showResults: boolean = false;
  
  private searchSubject = new Subject<string>();

  constructor(
    private searchService: SearchService,
    private router: Router,
    private navCtrl: NavController
  ) {
    console.log('Search page constructor called');
    // Set up debounced search
    this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged() // Only emit if value has changed
    ).subscribe(keyword => {
      this.performSearch(keyword);
    });
  }

  ngOnInit() {
    console.log('Search page initialized');
    console.log('Search service available:', !!this.searchService);
    this.loadSearchData();
  }

  ngAfterViewInit() {
    // Focus on search input when page loads
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    }, 100);
  }

  /**
   * Load all data for search
   */
  loadSearchData() {
    console.log('Loading search data...');
    this.isLoading = true;
    this.searchService.loadAllData().subscribe({
      next: (data) => {
        console.log('Search data loaded successfully:', data);
        this.isDataLoaded = true;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading search data:', error);
        this.isLoading = false;
        // Set data loaded to true even on error so the page can still function
        this.isDataLoaded = true;
      }
    });
  }

  /**
   * Handle search input changes
   */
  onSearchInput(event: any) {
    const keyword = event.target.value;
    this.searchKeyword = keyword;
    this.showResults = keyword.length > 0;
    
    if (keyword.length === 0) {
      this.searchResults = [];
      return;
    }

    // Trigger debounced search
    this.searchSubject.next(keyword);
  }

  /**
   * Perform the actual search
   */
  performSearch(keyword: string) {
    if (!this.isDataLoaded || !keyword.trim()) {
      this.searchResults = [];
      return;
    }

    this.isLoading = true;
    
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      this.searchResults = this.searchService.search(keyword);
      this.isLoading = false;
    }, 100);
  }

  /**
   * Handle search result click
   */
  onResultClick(result: SearchResult) {
    if (result.routeParams) {
      // Handle routes with parameters
      if (result.route === '/challenge-detail') {
        this.navCtrl.navigateForward(`${result.route}/${result.routeParams.id}`, {
          state: { data: result.routeParams.data }
        });
      } else if (result.route === '/program') {
        this.navCtrl.navigateForward(`${result.route}/${result.routeParams.id}`, {
          state: { data: result.routeParams.data }
        });
      } else if (result.route === '/workout-day-series') {
        this.navCtrl.navigateForward(`${result.route}/${result.routeParams.id}`, {
          state: { data: result.routeParams.data }
        });
      } else if (result.route === '/recipes') {
        this.router.navigate([result.route], {
          queryParams: { category: result.routeParams.category }
        });
      } else if (result.route === '/combo-details') {
        this.router.navigate([`${result.route}/${result.routeParams.id}`]);
      } else if (result.route === '/workout-day') {
        this.router.navigate([`${result.route}/${result.routeParams.id}`]);
      }
    } else {
      this.router.navigate([result.route]);
    }
  }

  /**
   * Clear search
   */
  clearSearch() {
    this.searchKeyword = '';
    this.searchResults = [];
    this.showResults = false;
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }

  /**
   * Quick search from button clicks
   */
  quickSearch(keyword: string) {
    this.searchKeyword = keyword;
    this.showResults = true;
    this.performSearch(keyword);
    
    // Focus back to search input for further typing
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    }, 100);
  }

  /**
   * Get result icon
   */
  getResultIcon(type: string): string {
    return this.searchService.getResultIcon(type);
  }

  /**
   * Get result color
   */
  getResultColor(type: string): string {
    return this.searchService.getResultColor(type);
  }

  /**
   * Get result type display name
   */
  getResultTypeName(type: string): string {
    switch (type) {
      case 'challenge':
        return 'Challenge';
      case 'fitness':
        return '30 Days Program';
      case 'workout':
        return 'Workout Series';
      case 'recipe':
        return 'Recipe';
      case 'premade-combo':
        return 'Pre-made Combo';
      case 'user-combo':
        return 'User Combo';
      case 'single-workout':
        return 'Workout';
      default:
        return 'Content';
    }
  }
}
