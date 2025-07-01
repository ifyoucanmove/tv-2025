import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class UpdateProfilePage implements OnInit {
  profileData: any;
  constructor(private router: Router) {}

  ngOnInit() {
    this.loadProfileData();
  }

  async loadProfileData() {
    try {
      const profileData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        dob: '1990-01-01',
        gender: 'male',
      };
      this.profileData = profileData;
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }
}
