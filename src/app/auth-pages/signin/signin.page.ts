import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SharedModule, ReactiveFormsModule],
})
export class SigninPage implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  errorMessage!: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public commonService: CommonService,
    public alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.commonService.showLoader();
      try {
        this.authService.userRequestData.set({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        });
        this.router.navigate(['/home']);
        /*    if (res.user.uid) {
          await this.authService.getUserDataPromise(res.user.uid);
          this.router.navigate(['/home']);
        } */
        this.commonService.hideLoader();
      } catch (error: any) {
        console.log(error, 'err');
        this.commonService.hideLoader();
        let err = JSON.stringify(error);
        if (err.includes('auth/user-not-found')) {
          this.errorMessage =
            'Email: ' + this.email!.value + '   -->   does not exist.';
          this.showAlert();
        } else if (err.includes('auth/wrong-password')) {
          this.errorMessage = 'Incorrect password. Please try again.';
          this.showAlert();
        } else if (err.includes('auth/too-many-requests')) {
          this.errorMessage =
            'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later';
          this.showAlert();
        } else if (err.includes('auth/invalid-email')) {
          this.errorMessage = 'The email address is badly formatted.';
          this.showAlert();
        } else {
          this.errorMessage = 'Something went wrong';
          this.showAlert();
        }
      }
    } else {
      this.commonService.showToast('', 'Email or Password invalid');
    }
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: '',
      message: this.errorMessage,
      buttons: ['OK'],
    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 3000);
  }
}
