import { httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  authState,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firstValueFrom, from, Observable } from 'rxjs';
import { collection, collectionData, query, where } from '@angular/fire/firestore';
import * as jwt_decode from 'jwt-decode';

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
  userData = signal<any>(null);

 // customer$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  customer = signal<any>(null);
  constructor() {
      authState(this.auth).subscribe(async (user) => {
      console.log(user, 'yser');
     if (user?.email) {
        await this.getStripeCustomerData(user.email);
      }
    }); 
  }

   async getTokenAsync() {
    try {
      let token = await (await this.auth.currentUser)?.getIdToken();
       const decodedToken = jwt_decode.jwtDecode(token!);
      const currentTime = Date.now() / 1000; 
      if (decodedToken.exp! < currentTime) {
        console.log('Token has expired');
        token = await (await this.auth.currentUser)?.getIdToken(true);
      } 
      return token;
    } catch(e) {
      return null;
    }
  }
getToken(): any {
  return from(this.getTokenAsync());
}
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

  signin(email:any,password:any){
   return signInWithEmailAndPassword(this.auth,email,password)
  }

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
    let data = localStorage.getItem('uid');
    return data ? true : false;
  }

  get userObjData(){
    let data:any = localStorage.getItem('userData');
    let parsedata = JSON.parse(data);
    return parsedata;
  }

  getTvAuthDataById(docId: string): Observable<any> {
    const docRef = doc(this.firestore, 'tvqrauth', docId);
    return docData(docRef, { idField: 'id' });
  }
  addOrUpdateTvAuthQRCollection(docId: string, data: any) {
    // Reference to the specific document
    const docRef = doc(this.firestore, 'tvqrauth', docId);

    // Use setDoc for adding a new document or completely replacing an existing one
    // Use merge: true to update only the provided fields without overwriting the entire document
    return setDoc(docRef, data, { merge: true })
      .then(() => {
        console.log(`Document with ID ${docId} successfully added/updated`);
        return docId;
      })
      .catch((error) => {
        console.error('Error adding/updating document: ', error);
        throw error;
      });
  }

   loginWithCustomToken(token: string) {
    return signInWithCustomToken(this.auth, token)
      /* signInWithCustomToken(this.auth, token)
        .then((userCredential) => {
          const user = userCredential.user;
  
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          console.error('Custom token login error:', error);
  
        }); */
    }

    /* stripe customer */
   async getStripeCustomerData(userEmail: string) {
    try { console.log(userEmail)
      let collectionRef = collection(this.firestore, "stripe_customers")
      let q = query(collectionRef, where("email", "==", userEmail));
      collectionData(q, { idField: "id" }).subscribe(customer =>{
        console.log(customer,"customer")
        if (customer && customer.length) {
          let stripeCustomer:any = customer[0];
          if(!stripeCustomer?.isCompletedEmails){
            stripeCustomer.isCompletedEmails=false
          }
          this.customer.set(stripeCustomer);
          //this.customer$.next(stripeCustomer);
          
       //  return stripeCustomer
        }else{
        // this.customer.update({});
         // this.customer$.next(null);
        }
      })
    } catch (error) {
      
    }
  }
}
