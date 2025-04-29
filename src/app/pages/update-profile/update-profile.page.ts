import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
  imports:[SharedModule]
})
export class UpdateProfilePage implements OnInit {

    profileData:any;
  constructor(
   private router: Router,
    private toastController: ToastController
  ) {
   
  }

  ngOnInit() {
    // Load existing profile data if available
    this.loadProfileData();
  }

  async loadProfileData() {
    try {
      // TODO: Load profile data from your service/API
      const profileData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        dob: '1990-01-01',
        gender: 'male'
      };
      this.profileData = profileData;
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }


} 