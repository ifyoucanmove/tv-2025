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

/* jsons */
  getProgrammList() {
    return this.http.get('assets/jsons/list.json');
  }
    getFavList() {
    return this.http.get('assets/jsons/favorite.json');
  }

  getByoList() {
    return this.http.get('assets/jsons/byo.json');
  }
 /*  combo feed */
  getComboFeed() {
    return this.http.get('assets/jsons/combo-feed.json');
  }
  getMyCombo() {
    return this.http.get('assets/jsons/my-combo.json');
  }
  getComboFeedDetails() {
    return this.http.get<any>('assets/jsons/combo-feed-details.json');
  }
 
  getFitnessDashboardDetails() {
    return this.http.get('assets/jsons/fitness-dashboard-details.json');
  }

/*   api calls */

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

  getFitnessList() {
    return this.http.get(`${this.apiBaseUrl}/programs`);
  }
  getWorkoutList() {
    return  this.http.get(`${this.apiBaseUrl}/programs`);
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
  
  markAsComplete(data:any){
    return this.http.post(`${this.apiBaseUrl}/mark-as-complete`,data)
  }

   geCompletetionDataOfSeries(data:any) {
    return this.http.get(`${this.apiBaseUrl}/completion-status?userId=${data.userId}&programId=${data.programId}&repeatCount=${data.repeatCount}`);
  }
   geCompletetionDataOfWorkout(data:any) {
    return this.http.get(`${this.apiBaseUrl}/completion-status?userId=${data.userId}&category=${data.category}&postId=${data.postId}`);
  }
   geCompletetionDataOfByo(data:any) {
    return this.http.get(`${this.apiBaseUrl}/completion-status?userId=${data.userId}&category=${data.category}&comboId=${data.comboId}`);
  }
   geWatchCompletedDataOfChallenge(data:any) {
    return this.http.get(`${this.apiBaseUrl}/challenge-watch-count?challengeId=${data.challengeId}&day=${data.day}&userId=${data.userId}&repeatCount=${data.repeatCount}`);
  }
   geWatchCompletedDataOfProgram(data:any) {
    return this.http.get(`${this.apiBaseUrl}/challenge-watch-count?programId=${data.programId}&userId=${data.userId}&repeatCount=${data.repeatCount}`);
  }
}
