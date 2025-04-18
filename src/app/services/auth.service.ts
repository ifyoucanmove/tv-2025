import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor() {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    // Mock login - replace with actual API call later
    if (email === 'demo@example.com' && password === 'demo123') {
      this.currentUser = {
        email: email,
        name: 'Demo User'
      };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      return of(true).pipe(delay(1000)); // Simulate API delay
    }
    return of(false).pipe(delay(1000));
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
