import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authCheckGuard } from './guards/auth-check.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'signin',canActivate:[authCheckGuard],
    loadComponent: () =>
      import('./auth-pages/signin/signin.page').then((m) => m.SigninPage),
  },
  {
    path: 'forgot-password',  canActivate:[authCheckGuard],
    loadComponent: () =>
      import('./auth-pages/forgot-password/forgot-password.page').then(
        (m) => m.ForgotPasswordPage
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.page').then((m) => m.MainPage),
    canActivate:[authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'challenge-detail/:id',
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
        path: 'challenge-video-details',
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
        path: 'combo-details/:id',
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
        path: 'pre-made-combo',
        loadComponent: () =>
          import(
            './pages/byo/pre-made/pre-made-combo/pre-made-combo.page'
          ).then((m) => m.PreMadeComboPage),
      },
      {
        path: 'combo-dashboard',
        loadComponent: () =>
          import(
            './pages/byo/combos-dashboard/combo-dashboard/combo-dashboard.page'
          ).then((m) => m.ComboDashboardPage),
      },
      {
        path: 'combo-feed-details',
        loadComponent: () =>
          import(
            './pages/byo/combos-dashboard/combo-feed-details/combo-feed-details.page'
          ).then((m) => m.ComboFeedDetailsPage),
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
      {
        path: 'fitness-dashboard-details',
        loadComponent: () =>
          import(
            './pages/fitness/fitness-dashboard-details/fitness-dashboard-details.page'
          ).then((m) => m.FitnessDashboardDetailsPage),
      },
      {
        path: 'video-list',
        loadComponent: () =>
          import('./pages/video-list/video-list.page').then(
            (m) => m.VideoListPage
          ),
      },
      {
        path: 'workout-day/:id',
        loadComponent: () =>
          import(
            './pages/workouts/workout-day-list/workout-day-list.page'
          ).then((m) => m.WorkoutDayListPage),
      },
      {
    path: 'workout-day-series/:id',
    loadComponent: () => import('./pages/workouts/workout-day-series-list/workout-day-series-list.page').then( m => m.WorkoutDaySeriesListPage)
  },
      {
        path: 'workout-detail',
        loadComponent: () =>
          import('./pages/workouts/workout-detail/workout-detail.page').then(
            (m) => m.WorkoutDetailPage
          ),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./pages/search-page/search-page.page').then(
            (m) => m.SearchPagePage
          ),
      },
  {
    path: 'workout-series-list',
    loadComponent: () => import('./pages/workouts/workout-series-list/workout-series-list.page').then( m => m.WorkoutSeriesListPage)
  },
  {
    path: 'trainers-list',
    loadComponent: () => import('./pages/trainers/trainer-list/trainer-list.page').then( m => m.TrainerListPage)
  },
  {
    path: 'trainer-details',
    loadComponent: () => import('./pages/trainers/trainer-details/trainer-details.page').then( m => m.TrainerDetailsPage)
  }
    ],
  },
  
];
