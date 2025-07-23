import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { HeaderPage } from 'src/app/shared/header/header.page';
import { ConfirmPopupComponent } from 'src/app/shared/modals/confirm-popup/confirm-popup.component';
import { ModalController,NavController  } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    HeaderPage,
  ],
})
export class MainPage implements OnInit {
  isCollapsed = false;
  focusedItem: any = null;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('mainContent') mainContent!: ElementRef;

  menuItems = [
    { icon: 'home', label: 'Home',isDisabled:false, route: '/home' },
    { icon: 'search', label: 'Search',isDisabled:true, route: '/search' },
    { icon: 'favorite', label: 'Favorites',isDisabled:true, route: '/favorites' },
    { icon: 'fastfood', label: 'Recipe',isDisabled:false, route: '/recipe-category' },
    { icon: 'donut_small', label: 'Byo Combo',isDisabled:false, route: '/byo-combo' },
/*     { icon: 'donut_small', label: 'Trainers',isDisabled:false, route: '/trainers-list' }, */
    { icon: 'person', label: 'Profile',isDisabled:true, route: '/update-profile' },
    { icon: 'settings', label: 'Settings',isDisabled:true, route: '/settings' },
  ];

  focusingMap: any = {
    home: { route: 'home', elements: ['videocard0'] },
    search: { route: 'search', elements: ['search-input'] },
    favorites: { route: 'favourite', elements: ['favorite-card-0'] },
    'recipe-category': {
      route: 'recipe-category',
      elements: ['recipe-card-0'],
    },
    'recipe-list': { route: 'recipes', elements: ['recipe-list-0'] },
    'single-recipe': { route: 'single-recipe', elements: ['recipe-single-0'] },
    'byo-combo': { route: 'byo-combo', elements: ['byo-card-0'] },
    'user-made-combo': {
      route: 'user-made-combo',
      elements: ['user-made-card-0'],
    },
    'combo-details': {
      route: 'combo-details',
      elements: ['combo-details-card-0'],
    },
    'update-profile': {
      route: 'update-profile',
      elements: ['update-profile-input'],
    },
     'challenge-detail': {
      route: 'challenge-detail',
      elements: ['weekcard0'],
    },
    settings: { route: 'settings', elements: ['settings-input'] },
  };

  constructor(
    private authService: AuthService,private apiService: ApiService,
    private modalCtrl: ModalController,
    private router: Router,private navCtrl: NavController
  ) {}

  ngOnInit(): void {
  

  }

  logout(): void {
    this.logoutConfirm();
    // this.authService.logout();
    ///
  }

  toggleSidenav(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.sidenav) {
      if (this.isCollapsed) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
    }
  }

  onSideNavKeyDown(event: KeyboardEvent): void {
    console.log(event.key)
    if (event.key === 'ArrowRight') {
      this.isCollapsed = true;
      event.preventDefault();
      // Focus the main content area
      if (this.mainContent) {
        const firstFocusableElement =
          this.mainContent.nativeElement.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
           console.log(firstFocusableElement,"firstFocusableElement")
        if (firstFocusableElement) {
          firstFocusableElement.focus();
        } else {
          this.mainContent.nativeElement.focus();
        }
      }
      const currentUrl = this.router.url;
       console.log(currentUrl,"currentUrl")
      if (currentUrl.includes(this.focusingMap['home'].route)) {
        let ele = document.getElementById(this.focusingMap['home'].elements[0]);
         console.log(ele,"ele")
        if (ele) {
          ele.focus();
        }
      }
      if (currentUrl.includes(this.focusingMap['recipe-category'].route)) {
        let ele = document.getElementById(
          this.focusingMap['recipe-category'].elements[0]
        );
        if (ele) {
          ele.focus();
        }
      }
      if (currentUrl.includes(this.focusingMap['recipe-list'].route)) {
        let ele = document.getElementById(
          this.focusingMap['recipe-list'].elements[0]
        );
        if (ele) {
          ele.focus();
        }
      }
      if (currentUrl.includes(this.focusingMap['single-recipe'].route)) {
        let ele = document.getElementById(
          this.focusingMap['single-recipe'].elements[0]
        );
        if (ele) {
          ele.focus();
        }
      }
      if (currentUrl.includes(this.focusingMap['favorites'].route)) {
        let ele = document.getElementById(
          this.focusingMap['favorites'].elements[0]
        );
        if (ele) {
          ele.focus();
        }
      }
      if (currentUrl.includes(this.focusingMap['byo-combo'].route)) {
        let ele = document.getElementById(
          this.focusingMap['byo-combo'].elements[0]
        );
        if (ele) {
          ele.focus();
        }
      }
      if (currentUrl.includes(this.focusingMap['user-made-combo'].route)) {
        let ele = document.getElementById(
          this.focusingMap['user-made-combo'].elements[0]
        );
        if (ele) {
          ele.focus();
        }
      }
      if (currentUrl.includes(this.focusingMap['combo-details'].route)) {
        let ele = document.getElementById(
          this.focusingMap['combo-details'].elements[0]
        );
        if (ele) {
          ele.focus();
        }
      }
      
    }
  }
  checkEnterFocus(): void {
    console.log(this.isCollapsed,'checkEnterFocus')
    if (this.isCollapsed) {
      this.isCollapsed = false;
    }
  }

  async logoutConfirm() {
    const modal = await this.modalCtrl.create({
      component: ConfirmPopupComponent,
      cssClass: 'confirm-modal',
      componentProps: { message: 'Are you sure you want to logout?' },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data == 'yes') {
      this.authService.logout()
    }
  }
 navigateTo(item: any) {
  if(item.isDisabled){
  return
  }
    this.navCtrl.navigateForward(item.route);
  }
}
