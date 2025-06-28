import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);

  getProgrammList() {
    return this.http.get('assets/jsons/list.json');
  }
  getChallengeList() {
    return this.http.get('assets/jsons/challenge.json');
  }
  getFitnessList() {
    return this.http.get('assets/jsons/fitness.json');
  }
  getWorkoutList() {
    return this.http.get('assets/jsons/workout.json');
  }
}
