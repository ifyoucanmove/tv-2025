import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./auth-pages/signin/signin.page').then((m) => m.SigninPage),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./auth-pages/forgot-password/forgot-password.page').then(
        (m) => m.ForgotPasswordPage
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.page').then((m) => m.MainPage),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'challenge-detail',
        loadComponent: () =>
          import(
            './pages/challenges/challenge-details/challenge-details.page'
          ).then((m) => m.ChallengeDetailsPage),
      },
      {
        path: 'challenge-list',
        loadComponent: () =>
          import('./pages/challenges/challenge-list/challenge-list.page').then(
            (m) => m.ChallengeListPage
          ),
      },
      {
        path: 'challenge-video-details/:id',
        loadComponent: () =>
          import(
            './pages/challenges/challenge-video-details/challenge-video-details.page'
          ).then((m) => m.ChallengeVideoDetailsPage),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./pages/favourite/favourite.page').then(
            (m) => m.FavouritePage
          ),
      },
      {
        path: 'recipe-category',
        loadComponent: () =>
          import(
            './pages/recipes/recipe-categories/recipe-categories.page'
          ).then((m) => m.RecipeCategoriesPage),
      },
      {
        path: 'recipes',
        loadComponent: () =>
          import('./pages/recipes/recipe-list/recipe-list.page').then(
            (m) => m.RecipeListPage
          ),
      },
      {
        path: 'single-recipe/:id',
        loadComponent: () =>
          import('./pages/recipes/single-recipe/single-recipe.page').then(
            (m) => m.SingleRecipePage
          ),
      },
      {
        path: 'byo-combo',
        loadComponent: () =>
          import('./pages/byo/byo-combo/byo-combo.page').then(
            (m) => m.ByoComboPage
          ),
      },
      {
        path: 'combo-details',
        loadComponent: () =>
          import('./pages/byo/combo-details/combo-details.page').then(
            (m) => m.ComboDetailsPage
          ),
      },
      {
        path: 'play-combo',
        loadComponent: () =>
          import('./pages/byo/play-combo/play-combo.page').then(
            (m) => m.PlayComboPage
          ),
      },
      {
        path: 'user-made-combo',
        loadComponent: () =>
          import('./pages/byo/user-made-combo/user-made-combo.page').then(
            (m) => m.UserMadeComboPage
          ),
      },
      {
        path: 'program/:id',
        loadComponent: () =>
          import('./pages/fitness/fitness-day-list/fitness-day-list.page').then(
            (m) => m.FitnessDayListPage
          ),
      },
      {
        path: 'fitness-detail',
        loadComponent: () =>
          import('./pages/fitness/fitness-detail/fitness-detail.page').then(
            (m) => m.FitnessDetailPage
          ),
      },
      {
        path: 'fitness-list',
        loadComponent: () =>
          import('./pages/fitness/fitness-list/fitness-list.page').then(
            (m) => m.FitnessListPage
          ),
      },
      {
        path: 'update-profile',
        loadComponent: () =>
          import('./pages/update-profile/update-profile.page').then(
            (m) => m.UpdateProfilePage
          ),
      },
      {
        path: 'workout-list',
        loadComponent: () =>
          import('./pages/workouts/workout-list/workout-list.page').then(
            (m) => m.WorkoutListPage
          ),
      },
    ],
  },
];
