import { Routes } from '@angular/router';

export const routes: Routes =[
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  /* {
    path: '**',
    redirectTo: 'home'
  }, */
  {
    path: '',
    loadComponent: () => import('./pages/main/main.page').then( m => m.MainPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
      },
      {
        path: 'challenge-detail',
        loadComponent: () => import('./pages/challenge-detail/challenge-detail.page').then( m => m.ChallengeDetailPage)
      },
      {
        path: 'fitness-detail',
        loadComponent: () => import('./pages/fitness-detail/fitness-detail.page').then( m => m.FitnessDetailPage)
      },
      {
        path: 'fitness-list',
        loadComponent: () => import('./pages/fitness-list/fitness-list.page').then( m => m.FitnessListPage)
      },
      {
        path: 'challenge-list',
        loadComponent: () => import('./pages/challenge-list/challenge-list.page').then( m => m.ChallengeListPage)
      }
    ]
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./pages/sign-in/sign-in.page').then( m => m.SignInPage)
  }
  
];

