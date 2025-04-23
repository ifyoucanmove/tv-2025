import { Routes } from '@angular/router';

export const routes: Routes =[
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  },
  {
    path: '',
    loadComponent: () => import('./pages/main/main.page').then( m => m.MainPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
      }
    ]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'confirm',
    loadComponent: () => import('./shared/modals/confirm/confirm.page').then( m => m.ConfirmPage)
  }
];

