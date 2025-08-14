import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, limitToLast, onSnapshot, orderBy, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CacheItem {
  data: any;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);
  apiBaseUrl = environment.apiBaseUrl;
  firestore: Firestore = inject(Firestore); 
  subscriptionData: any;
  
  // Cache storage
  private cache = new Map<string, CacheItem>();
  private readonly DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes default

  constructor(public authService: AuthService) {}

  /**
   * Get cached data if available and not expired
   */
  private getCachedData(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    // Remove expired cache
    if (cached) {
      this.cache.delete(key);
    }
    return null;
  }

  /**
   * Store data in cache
   */
  private setCachedData(key: string, data: any, ttl: number = this.DEFAULT_CACHE_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Clear specific cache entry
   */
  public clearCache(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  public clearAllCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  public getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  /**
   * Clear completion-related caches when data is modified
   */
  private clearCompletionCaches(data: any): void {
    // Clear completion caches based on the type of data
    if (data.programId) {
      this.clearCache(`completionSeries_${data.userId}_${data.programId}_${data.repeatCount || 0}`);
    }
    if (data.category && data.postId) {
      this.clearCache(`completionWorkout_${data.userId}_${data.category}_${data.postId}`);
    }
    if (data.category && data.comboId) {
      this.clearCache(`completionByo_${data.userId}_${data.category}_${data.comboId}`);
    }
    if (data.challengeId && data.day) {
      this.clearCache(`watchChallenge_${data.challengeId}_${data.day}_${data.userId}_${data.repeatCount || 0}`);
    }
    if (data.challengeId && data.category) {
      this.clearCache(`watchCoolDownWarmUp_${data.challengeId}_${data.userId}_${data.category}`);
    }
  }

  /**
   * Clear favorites cache when favorites are modified
   */
  private clearFavoritesCache(uid: string): void {
    this.clearCache(`favorites_${uid}`);
  }

  /**
   * Clear all completion-related caches
   */
  private clearAllCompletionCaches(): void {
    const keysToDelete: string[] = [];
    this.cache.forEach((value, key) => {
      if (key.startsWith('completion') || key.startsWith('watch')) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /**
   * Clear all favorites-related caches
   */
  private clearAllFavoritesCaches(): void {
    const keysToDelete: string[] = [];
    this.cache.forEach((value, key) => {
      if (key.startsWith('favorites_')) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /* jsons */
  getProgrammList() {
    const cacheKey = 'programmList';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get('assets/jsons/list.json').pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }
   /*  getFavList() {
    return this.http.get('assets/jsons/favorite.json');
  } */

  getByoList() {
    const cacheKey = 'byoList';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get('assets/jsons/byo.json').pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }
 /*  combo feed */
  getComboFeed() {
    const cacheKey = 'comboFeed';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get('assets/jsons/combo-feed.json').pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }
  getMyCombo() {
    const cacheKey = 'myCombo';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get('assets/jsons/my-combo.json').pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }
  getComboFeedDetails() {
    const cacheKey = 'comboFeedDetails';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get<any>('assets/jsons/combo-feed-details.json').pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }
 
  getFitnessDashboardDetails() {
    const cacheKey = 'fitnessDashboardDetails';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get('assets/jsons/fitness-dashboard-details.json').pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }

/*   api calls */

  getChallengeList() {
    const cacheKey = 'challengeList';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/challenges`).pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }
  getChallengeDetails(id: any) {
    const cacheKey = `challengeDetails_${id}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/challenges/${id}/days`).pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }
  getCategoriesList() {
    const cacheKey = 'categoriesList';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/categories`).pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }
   getPostByCategory(categoryid:any) {
    const cacheKey = `postByCategory_${categoryid}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/posts-by-category?category=${categoryid}`).pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }
   getProgramItems(id:any) {
    const cacheKey = `programItems_${id}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/program-items?programId=${id}`).pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }

  getFitnessList() {
    const cacheKey = 'fitnessList';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/programs`).pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }
  getWorkoutList() {
    const cacheKey = 'workoutList';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/programs`).pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }

  getComboDetails(id:any) {
    const cacheKey = `comboDetails_${id}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/byo-combo-details?id=${id}`).pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }
  getUserMadeCombo(type:any,uid:any) {
    const cacheKey = `userMadeCombo_${type}_${uid}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/byo-combos?type=${type}&uid=${uid}`).pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }
  getPreMadeCombo() {
    const cacheKey = 'preMadeCombo';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/admin-byo-combos`).pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }

/* dashboardData */

  loadCompletedData(userEmail: any, limit: number) {
    let collectionRef = collection(this.firestore, "completed")
    let q = query(collectionRef, where("userId", "==", userEmail)
    ,orderBy('date', 'asc'),limitToLast(limit)
  )
    return collectionData(q, { idField: "id" })
   
  }
   getMystatsData(startDate: string, endDate: string, userEmail: string) {
    const cacheKey = `mystats_${userEmail}_${startDate}_${endDate}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`https://us-central1-ifyoucanmove-dev.cloudfunctions.net/mystats?userId=${userEmail}&fromDate=${startDate}&toDate=${endDate}`).pipe(
      tap(data => this.setCachedData(cacheKey, data, 2 * 60 * 1000)) // 2 minutes cache for stats
    );
  }
  
/*   watchData */

   geCompletetionDataOfSeries(data:any) {
    const cacheKey = `completionSeries_${data.userId}_${data.programId}_${data.repeatCount}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/completion-status?userId=${data.userId}&programId=${data.programId}&repeatCount=${data.repeatCount}`).pipe(
      tap(response => this.setCachedData(cacheKey, response, 1 * 60 * 1000)) // 1 minute cache for completion data
    );
  }
   geCompletetionDataOfWorkout(data:any) {
    const cacheKey = `completionWorkout_${data.userId}_${data.category}_${data.postId}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/completion-status?userId=${data.userId}&category=${data.category}&postId=${data.postId}`).pipe(
      tap(response => this.setCachedData(cacheKey, response, 1 * 60 * 1000)) // 1 minute cache for completion data
    );
  }
   geCompletetionDataOfByo(data:any) {
    const cacheKey = `completionByo_${data.userId}_${data.category}_${data.comboId}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/completion-status?userId=${data.userId}&category=${data.category}&comboId=${data.comboId}`).pipe(
      tap(response => this.setCachedData(cacheKey, response, 1 * 60 * 1000)) // 1 minute cache for completion data
    );
  }
   geWatchCompletedDataOfChallenge(data:any) {
    const cacheKey = `watchChallenge_${data.challengeId}_${data.day}_${data.userId}_${data.repeatCount}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/completion-status?challengeId=${data.challengeId}&day=${data.day}&userId=${data.userId}&repeatCount=${data.repeatCount}`).pipe(
      tap(response => this.setCachedData(cacheKey, response, 1 * 60 * 1000)) // 1 minute cache for completion data
    );
  }
  /*  geWatchCompletedDataOfProgram(data:any) {
    return this.http.get(`${this.apiBaseUrl}/challenge-watch-count?programId=${data.programId}&userId=${data.userId}&repeatCount=${data.repeatCount}`);
  } */
   geWatchCompletedDataOfCoolDownOrWarmUp(data:any) {
    const cacheKey = `watchCoolDownWarmUp_${data.challengeId}_${data.userId}_${data.category}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/completion-status?challengeId=${data.challengeId}&userId=${data.userId}&category=${data.category}`).pipe(
      tap(response => this.setCachedData(cacheKey, response, 1 * 60 * 1000)) // 1 minute cache for completion data
    );
  }
/* markAsComplete */

  markAsComplete(data:any){
    // Clear related completion caches when marking as complete
    this.clearCompletionCaches(data);
    return this.http.post(`${this.apiBaseUrl}/mark-as-complete`,data)
  }
  updateMarkAsComplete(id:any,data:any){
    // Clear related completion caches when updating completion
    this.clearCompletionCaches(data);
    return this.http.put(`${this.apiBaseUrl}/mark-as-complete/${id}`,data)
  }
  deleteMarkAsComplete(id:any){
    // Note: We can't easily clear specific caches here without the data
    // So we'll clear all completion-related caches
    this.clearAllCompletionCaches();
    return this.http.delete(`${this.apiBaseUrl}/mark-as-complete/${id}`)
  }

  /* favorites */
addFavorites(data:any){
    // Clear favorites cache when adding new favorite
    if (data.email) {
      this.clearFavoritesCache(data.email);
    }
    return this.http.post(`${this.apiBaseUrl}/favorites`,data)
  }
  deleteFavorites(id:any){
    // Note: We can't easily clear specific favorites cache here without the user email
    // So we'll clear all favorites caches
    this.clearAllFavoritesCaches();
    return this.http.delete(`${this.apiBaseUrl}/favorites/${id}`)
  }
   getFavorites(uid:any){
    const cacheKey = `favorites_${uid}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/favorites?email=${uid}`).pipe(
      tap(data => this.setCachedData(cacheKey, data, 2 * 60 * 1000)) // 2 minutes cache for favorites
    );
  }
  /* subscription */

 async getSubscriptionData() {
  console.log(this.authService.customer())
    if (this.authService.customer().subscription_id) {
     let url
      if (this.authService.customer()._isPaddleBillingV2) {
        url = "https://us-central1-ifyoucanmove-dev.cloudfunctions.net/paddleUserGetBySubscriptionIdV2";
      } else {
        url = "https://us-central1-ifyoucanmove-dev.cloudfunctions.net/paddleUserGetBySubscriptionId";
      }
      this.http.post(url, {
        subscription_id: this.authService.customer().subscription_id
      }).subscribe({
        next: (res: any) => {
          this.subscriptionData = res.response[0];
        //  this.loading = false;
        return this.subscriptionData
        },
        error: (error) => {
        //  this.loading = false;
         
        }
      });
    }
  }

  getSubscriptionCancellationData(){
  // Reference the subcollection path
  const collectionRef = collection(
    this.firestore, 
    "functions_webhooks", 
    "Stripe", 
    "subscription_cancelled"
  );
  
  // Create query with where conditions
  const q = query(
    collectionRef,
    where("_subscription_id", "==", this.authService.customer().subscription_id),
    where("_email", "==", this.authService.customer().email)
  );
  
  // Return Observable that emits snapshot changes
  return new Observable(observer => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      observer.next(data);
    }, (error:any) => {
      observer.error(error);
    });
    
    // Return cleanup function
    return () => unsubscribe();
  });
  }

   getPostById(id:any){
    const cacheKey = `postById_${id}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/post?id=${id}`).pipe(
      tap(data => this.setCachedData(cacheKey, data))
    );
  }

  /**
   * Search API endpoint (for future server-side search implementation)
   */
  searchContent(query: string) {
    const cacheKey = `search_${query}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      return of(cached);
    }
    
    return this.http.get(`${this.apiBaseUrl}/search?q=${encodeURIComponent(query)}`).pipe(
      tap(data => this.setCachedData(cacheKey, data, 2 * 60 * 1000)) // 2 minutes cache for search results
    );
  }
}
