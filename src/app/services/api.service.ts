import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);
  apiBaseUrl = environment.apiBaseUrl;

  getProgrammList() {
    return this.http.get('assets/jsons/list.json');
  }
  getChallengeList() {
    return this.http.get(`${this.apiBaseUrl}/challenges`);
  }
  getCoolDownList() {
    return this.http.get('assets/jsons/cool-down.json');
  }
  getWarmUpList() {
    return this.http.get('assets/jsons/warm-up.json');
  }
  getFitnessList() {
    return this.http.get('assets/jsons/fitness.json');
  }
  getWorkoutList() {
    return this.http.get('assets/jsons/workout.json');
  }
  getFavList() {
    return this.http.get('assets/jsons/favorite.json');
  }
  getRecipeCategory() {
    return this.http.get('assets/jsons/recipe.json');
  }
  getSingleRecipe() {
    return this.http.get('assets/jsons/single-recipe.json');
  }
  getByoList() {
    return this.http.get('assets/jsons/byo.json');
  }
  getComboDetails() {
    return this.http.get<any>('assets/jsons/combo-details.json');
  }
  getUserMadeCombo() {
    return this.http.get('assets/jsons/user-made.json');
  }
  getPreMadeCombo() {
    return this.http.get('assets/jsons/pre-made.json');
  }
  getComboFeed() {
    return this.http.get('assets/jsons/combo-feed.json');
  }
  getMyCombo() {
    return this.http.get('assets/jsons/my-combo.json');
  }
  getComboFeedDetails() {
    return this.http.get<any>('assets/jsons/combo-feed-details.json');
  }
  getUserResponse(data: any) {
    return this.http.get('assets/jsons/user-response.json');
  }

  getPlayCombo() {
    return this.http.get('assets/jsons/play-combo.json');
  }
  getFitnessDashboardDetails() {
    return this.http.get('assets/jsons/fitness-dashboard-details.json');
  }

  // Example: Real API call using the base URL
  getSomethingFromApi() {
    return this.http.get(`${this.apiBaseUrl}/your-endpoint`);
  }
}
