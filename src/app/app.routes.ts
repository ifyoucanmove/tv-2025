import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./auth-pages/signin/signin.page').then((m) => m.SigninPage),
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./pages/main/main.page').then((m) => m.MainPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./auth-pages/forgot-password/forgot-password.page').then(
        (m) => m.ForgotPasswordPage
      ),
  },
];
