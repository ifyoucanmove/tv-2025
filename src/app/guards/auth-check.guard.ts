import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authCheckGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('authGuard', authService.isAuthenticated());
  if (authService.isAuthenticated()) {
   // return true;
   return router.navigateByUrl('/home')
  }

  // Redirect to login page
  return true;
};
