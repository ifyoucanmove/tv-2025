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
    path: 'sign-in',
    loadComponent: () => import('./pages/sign-in/sign-in.page').then( m => m.SignInPage)
  },
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
        path: 'challenge-video-details/:id',
        loadComponent: () => import('./pages/challenge-video-details/challenge-video-details.page').then( m => m.ChallengeVideoDetailsPage)
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
      },
      {
        path: 'update-profile',
        loadComponent: () => import('./pages/update-profile/update-profile.page').then( m => m.UpdateProfilePage)
      },
      {
        path: 'recipe-category',
        loadComponent: () => import('./pages/recipe-list/recipe-list.page').then( m => m.RecipeListPage)
      },
      {
        path: 'recipes',
        loadComponent: () => import('./pages/recipe-category-list/recipe-category-list.page').then( m => m.RecipeCategoryListPage)
      },
      {
        path: 'single-recipe/:id',
        loadComponent: () => import('./pages/single-recipe/single-recipe.page').then( m => m.SingleRecipePage)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/favorite/favorite.page').then( m => m.FavoritePage)
      }
    ]
  }
  
];

