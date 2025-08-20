import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface SearchResult {
  id: string;
  title: string;
  image?: string;
  type: 'challenge' | 'fitness' | 'workout' | 'recipe' | 'premade-combo' | 'user-combo' | 'single-workout';
  description?: string;
  duration?: string;
  category?: string;
  route: string;
  routeParams?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private allData: any = {
    challenges: [],
    fitness: [],
    workouts: [],
    recipes: [],
    premadeCombos: [],
    userCombos: [],
    singleWorkouts: []
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  /**
   * Load all data for search
   */
  loadAllData(): Observable<any> {
    console.log('SearchService: Starting to load all data');
    const requests = [
      this.loadChallenges(),
      this.loadFitness(),
      this.loadWorkouts(),
      this.loadRecipes(),
      this.loadPremadeCombos(),
      this.loadUserCombos(),
      this.loadSingleWorkouts()
    ];

    return forkJoin(requests).pipe(
      map(() => {
        console.log('SearchService: All data loaded successfully', this.allData);
        return this.allData;
      }),
      catchError(error => {
        console.error('SearchService: Error loading search data:', error);
        return of(this.allData);
      })
    );
  }

  /**
   * Perform full-text search across all content types
   */
  search(keyword: string): SearchResult[] {
    if (!keyword || keyword.trim().length === 0) {
      return [];
    }

    const searchTerm = keyword.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Search in challenges
    this.allData.challenges.forEach((challenge: any) => {
      if (this.matchesSearch(challenge.dashTitle || challenge.title, searchTerm) ||
          this.matchesSearch(challenge.description || '', searchTerm)) {
        results.push({
          id: challenge.id,
          title: challenge.dashTitle || challenge.title,
          image: challenge.dashBannerUrl || challenge.image,
          type: 'challenge',
          description: challenge.description,
          duration: challenge.duration || '20',
          route: '/challenge-detail',
          routeParams: { id: challenge.id, data: challenge.dashTitle || challenge.title }
        });
      }
    });

    // Search in fitness programs
    this.allData.fitness.forEach((fitness: any) => {
      if (this.matchesSearch(fitness.title, searchTerm) ||
          this.matchesSearch(fitness.description || '', searchTerm)) {
        results.push({
          id: fitness.id,
          title: fitness.title,
          image: fitness.image,
          type: 'fitness',
          description: fitness.description,
          route: '/program',
          routeParams: { id: fitness.id, data: fitness }
        });
      }
    });

    // Search in workout series
    this.allData.workouts.forEach((workout: any) => {
      if (this.matchesSearch(workout.title, searchTerm) ||
          this.matchesSearch(workout.description || '', searchTerm)) {
        results.push({
          id: workout.id,
          title: workout.title,
          image: workout.image,
          type: 'workout',
          description: workout.description,
          route: '/workout-day-series',
          routeParams: { id: workout.id, data: workout }
        });
      }
    });

    // Search in recipes
    this.allData.recipes.forEach((recipe: any) => {
      if (this.matchesSearch(recipe.title, searchTerm) ||
          this.matchesSearch(recipe.description || '', searchTerm)) {
        results.push({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          type: 'recipe',
          description: recipe.description,
          route: '/recipes',
          routeParams: { category: recipe.title }
        });
      }
    });

    // Search in premade combos
    this.allData.premadeCombos.forEach((combo: any) => {
      if (this.matchesSearch(combo.title, searchTerm) ||
          this.matchesSearch(combo.description || '', searchTerm)) {
        results.push({
          id: combo.id,
          title: combo.title,
          image: combo.image,
          type: 'premade-combo',
          description: combo.description,
          route: '/combo-details',
          routeParams: { id: combo.id }
        });
      }
    });

    // Search in user combos
    this.allData.userCombos.forEach((combo: any) => {
      if (this.matchesSearch(combo.title, searchTerm) ||
          this.matchesSearch(combo.description || '', searchTerm)) {
        results.push({
          id: combo.id,
          title: combo.title,
          image: combo.image,
          type: 'user-combo',
          description: combo.description,
          route: '/combo-details',
          routeParams: { id: combo.id }
        });
      }
    });

    // Search in single workouts
    this.allData.singleWorkouts.forEach((workout: any) => {
      if (this.matchesSearch(workout.title, searchTerm) ||
          this.matchesSearch(workout.description || '', searchTerm)) {
        results.push({
          id: workout.id,
          title: workout.title,
          image: workout.image,
          type: 'single-workout',
          description: workout.description,
          route: '/workout-day',
          routeParams: { id: workout.id }
        });
      }
    });

    return results;
  }

  /**
   * Check if text matches search term
   */
  private matchesSearch(text: string, searchTerm: string): boolean {
    if (!text) return false;
    return text.toLowerCase().includes(searchTerm);
  }

  /**
   * Load challenges data
   */
  private loadChallenges(): Observable<any> {
    return this.apiService.getChallengeList().pipe(
      map((res: any) => {
        this.allData.challenges = res.challenges || [];
        return this.allData.challenges;
      }),
      catchError(error => {
        console.error('Error loading challenges:', error);
        return of([]);
      })
    );
  }

  /**
   * Load fitness programs data
   */
  private loadFitness(): Observable<any> {
    return this.apiService.getFitnessList().pipe(
      map((res: any) => {
        this.allData.fitness = res['30day'] || [];
        return this.allData.fitness;
      }),
      catchError(error => {
        console.error('Error loading fitness:', error);
        return of([]);
      })
    );
  }

  /**
   * Load workout series data
   */
  private loadWorkouts(): Observable<any> {
    return this.apiService.getWorkoutList().pipe(
      map((res: any) => {
        this.allData.workouts = res.workout || [];
        return this.allData.workouts;
      }),
      catchError(error => {
        console.error('Error loading workouts:', error);
        return of([]);
      })
    );
  }

  /**
   * Load recipes data
   */
  private loadRecipes(): Observable<any> {
    return this.apiService.getCategoriesList().pipe(
      map((res: any) => {
        this.allData.recipes = res.categories['recipes'] || [];
        return this.allData.recipes;
      }),
      catchError(error => {
        console.error('Error loading recipes:', error);
        return of([]);
      })
    );
  }

  /**
   * Load premade combos data
   */
  private loadPremadeCombos(): Observable<any> {
    return this.apiService.getPreMadeCombo().pipe(
      map((res: any) => {
        this.allData.premadeCombos = res.combos || [];
        return this.allData.premadeCombos;
      }),
      catchError(error => {
        console.error('Error loading premade combos:', error);
        return of([]);
      })
    );
  }

  /**
   * Load user combos data
   */
  private loadUserCombos(): Observable<any> {
    if (!this.authService.userObjData?.uid) {
      return of([]);
    }
    
    return this.apiService.getUserMadeCombo('user', this.authService.userObjData.uid).pipe(
      map((res: any) => {
        this.allData.userCombos = res.combos || [];
        return this.allData.userCombos;
      }),
      catchError(error => {
        console.error('Error loading user combos:', error);
        return of([]);
      })
    );
  }

  /**
   * Load single workouts data (from categories)
   */
  private loadSingleWorkouts(): Observable<any> {
    return this.apiService.getCategoriesList().pipe(
      map((res: any) => {
        // Get workouts from categories and fetch individual workout posts
        const workoutCategories = res.categories['workouts'] || [];
        this.allData.singleWorkouts = workoutCategories;
        return this.allData.singleWorkouts;
      }),
      catchError(error => {
        console.error('Error loading single workouts:', error);
        return of([]);
      })
    );
  }

  /**
   * Get search result icon based on type
   */
  getResultIcon(type: string): string {
    switch (type) {
      case 'challenge':
        return 'trophy';
      case 'fitness':
        return 'person';
      case 'workout':
        return 'barbell';
      case 'recipe':
        return 'restaurant';
      case 'premade-combo':
      case 'user-combo':
        return 'layers';
      case 'single-workout':
        return 'play-circle';
      default:
        return 'search';
    }
  }

  /**
   * Get search result color based on type
   */
  getResultColor(type: string): string {
    switch (type) {
      case 'challenge':
        return 'warning';
      case 'fitness':
        return 'primary';
      case 'workout':
        return 'secondary';
      case 'recipe':
        return 'success';
      case 'premade-combo':
        return 'tertiary';
      case 'user-combo':
        return 'medium';
      case 'single-workout':
        return 'danger';
      default:
        return 'dark';
    }
  }

  /**
   * Get popular search terms for quick access
   */
  getPopularSearchTerms(): string[] {
    return [
      'Cardio',
      'Strength',
      'Yoga',
      'Healthy',
      'Beginner',
      'Advanced',
      'Weight Loss',
      'Muscle Building',
      'Flexibility',
      'Core',
      'HIIT',
      'Pilates',
      'Meditation',
      'Nutrition',
      'Recovery'
    ];
  }

  /**
   * Get search suggestions based on partial input
   */
  getSearchSuggestions(partial: string): string[] {
    if (!partial || partial.length < 2) {
      return this.getPopularSearchTerms().slice(0, 5);
    }

    const suggestions: string[] = [];
    const searchTerm = partial.toLowerCase();

    // Add popular terms that match
    this.getPopularSearchTerms().forEach(term => {
      if (term.toLowerCase().includes(searchTerm)) {
        suggestions.push(term);
      }
    });

    // Add titles that match
    const allTitles = [
      ...this.allData.challenges.map((c: any) => c.dashTitle || c.title),
      ...this.allData.fitness.map((f: any) => f.title),
      ...this.allData.workouts.map((w: any) => w.title),
      ...this.allData.recipes.map((r: any) => r.title),
      ...this.allData.premadeCombos.map((c: any) => c.title),
      ...this.allData.userCombos.map((c: any) => c.title),
      ...this.allData.singleWorkouts.map((w: any) => w.title)
    ];

    allTitles.forEach(title => {
      if (title && title.toLowerCase().includes(searchTerm) && !suggestions.includes(title)) {
        suggestions.push(title);
      }
    });

    return suggestions.slice(0, 8); // Limit to 8 suggestions
  }
}
