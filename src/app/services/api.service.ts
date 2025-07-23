import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, limitToLast, orderBy, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);
  apiBaseUrl = environment.apiBaseUrl;
firestore: Firestore = inject(Firestore); 
  getProgrammList() {
    return this.http.get('assets/jsons/list.json');
  }
  getChallengeList() {
    return this.http.get(`${this.apiBaseUrl}/challenges`);
  }
  getChallengeDetails(id: any) {
   return this.http.get(`${this.apiBaseUrl}/challenges/${id}/days`);
  }
  getCategoriesList() {
    return this.http.get(`${this.apiBaseUrl}/categories`);
  }
   getPostByCategory(categoryid:any) {
    return this.http.get(`${this.apiBaseUrl}/posts-by-category?category=${categoryid}`);
  }
   getProgramItems(id:any) {
    return this.http.get(`${this.apiBaseUrl}/program-items?programId=${id}`);
  }
  getCoolDownList() {
    return this.http.get('assets/jsons/cool-down.json');
  }
  getWarmUpList() {
    return this.http.get('assets/jsons/warm-up.json');
  }
  getFitnessList() {
    return this.http.get(`${this.apiBaseUrl}/programs`);
  }
  getWorkoutList() {
    return  this.http.get(`${this.apiBaseUrl}/programs`);
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
  getComboDetails(id:any) {
 return this.http.get(`${this.apiBaseUrl}/byo-combo-details?id=${id}`);
  }
  getUserMadeCombo(type:any,uid:any) {
    return this.http.get(`${this.apiBaseUrl}/byo-combos?type=${type}&uid=${uid}`);
  }
  getPreMadeCombo() {
 return this.http.get(`${this.apiBaseUrl}/admin-byo-combos`);
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

  loadCompletedData(userEmail: any, limit: number) {
    let collectionRef = collection(this.firestore, "completed")
    let q = query(collectionRef, where("userId", "==", userEmail)
    ,orderBy('date', 'asc'),limitToLast(limit)
  )
    return collectionData(q, { idField: "id" })
   
  }
   getMystatsData(startDate: string, endDate: string, userEmail: string) {
    return this.http.get(`https://us-central1-ifyoucanmove-dev.cloudfunctions.net/mystats?userId=${userEmail}&fromDate=${startDate}&toDate=${endDate}`);
  }
  
}
