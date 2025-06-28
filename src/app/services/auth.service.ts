import { httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// Define the type for your request payload
interface SignInData {
  email: string;
  password: string;
}

// Define the type for your response if known (or use `unknown`)
interface SignInResponse {
  token: string;
  user: { name: string };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  userRequestData = signal<any>(null);
  constructor() {
    /*   authState(this.auth).subscribe(async (user) => {
      console.log(user, 'yser');
      if (user?.uid) {
        this.getUserData(user.uid);
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/signin');
      }
    }); */
  }

  /*   user = httpResource(() => ({
    url: `assets/jsons/signin.json`,
    method: 'POST',
    body: this.userRequestData(),
  })); */

  postUser = httpResource<SignInResponse>(() => {
    const data = this.userRequestData();

    if (!data) {
      return undefined;
    }

    return {
      url: 'assets/jsons/signin.json',
      method: 'POST',
      body: data,
    };
  });

  logout() {
    signOut(this.auth).then((res) => {
      localStorage.clear();
      //   window.location.href = "/signin";
      window.location.href = '/signin';
    });
  }

  getUserData(uid: any) {
    let userDoc = doc(this.firestore, `users/${uid}`);
    docData(userDoc, { idField: 'uid' }).subscribe((res) => {
      // this.userData.set(res);
      localStorage.setItem('user', JSON.stringify(res));
      console.log(res);
    });
  }
  async getUserDataPromise(uid: any) {
    try {
      const userDoc = doc(this.firestore, `users/${uid}`);
      const userData = await firstValueFrom(
        docData(userDoc, { idField: 'uid' })
      );

      //  this.userData.set(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
  isAuthenticated() {
    let data = localStorage.getItem('user');
    return data ? true : false;
  }
}
