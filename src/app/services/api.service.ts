import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, limitToLast, onSnapshot, orderBy, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);
  apiBaseUrl = environment.apiBaseUrl;
firestore: Firestore = inject(Firestore); 
subscriptionData:any;
constructor(public authService:AuthService){}
/* jsons */
  getProgrammList() {
    return this.http.get('assets/jsons/list.json');
  }
   /*  getFavList() {
    return this.http.get('assets/jsons/favorite.json');
  } */

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

/* dashboardData */

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
  
/*   watchData */

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
    return this.http.get(`${this.apiBaseUrl}/completion-status?challengeId=${data.challengeId}&day=${data.day}&userId=${data.userId}&repeatCount=${data.repeatCount}`);
  }
  /*  geWatchCompletedDataOfProgram(data:any) {
    return this.http.get(`${this.apiBaseUrl}/challenge-watch-count?programId=${data.programId}&userId=${data.userId}&repeatCount=${data.repeatCount}`);
  } */
   geWatchCompletedDataOfCoolDownOrWarmUp(data:any) {
    return this.http.get(`${this.apiBaseUrl}/completion-status?challengeId=${data.challengeId}&userId=${data.userId}&category=${data.category}`);
  }
/* markAsComplete */

  markAsComplete(data:any){
    return this.http.post(`${this.apiBaseUrl}/mark-as-complete`,data)
  }
  updateMarkAsComplete(id:any,data:any){
    return this.http.put(`${this.apiBaseUrl}/mark-as-complete/${id}`,data)
  }
  deleteMarkAsComplete(id:any){
    return this.http.delete(`${this.apiBaseUrl}/mark-as-complete/${id}`)
  }

  /* favorites */
addFavorites(data:any){
    return this.http.post(`${this.apiBaseUrl}/favorites`,data)
  }
  deleteFavorites(id:any){
    return this.http.delete(`${this.apiBaseUrl}/favorites/${id}`)
  }
   getFavorites(uid:any){
    return this.http.get(`${this.apiBaseUrl}/favorites?email=${uid}`)
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
    return this.http.get(`${this.apiBaseUrl}/post?id=${id}`)
  }
}
