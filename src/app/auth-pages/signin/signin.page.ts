import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { ApiService } from 'src/app/services/api.service';
import { QrCodeComponent } from 'ng-qrcode';
import { Subscription } from 'rxjs';
import { serverTimestamp } from '@angular/fire/firestore';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SharedModule, QrCodeComponent, ReactiveFormsModule],
})
export class SigninPage implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  errorMessage!: string;

  qrLink: any;
  qrValue: any;
  tokenSubscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public apiService: ApiService,
    public commonService: CommonService,
    public alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.qrValue = this.generateRandomAlphanumeric();
    this.qrLink = `https://ifyoucanmove.com/tvauth/${this.qrValue}?type=signin`;
    this.addCodeTvAuth();
    this.tokenSubscription = this.authService
      .getTvAuthDataById(this.qrValue)
      .subscribe((res) => {
        console.log(res, 'getQrDataById');
        if (res?.token) {
          this.loginWithToken(res.token);
          this.commonService.showToast('Login with token', '');
        }
      });
  }
  loginWithToken(token: any) {
    this.authService.loginWithCustomToken(token);
  }
  async addCodeTvAuth() {
    try {
      let res = this.authService.addOrUpdateTvAuthQRCollection(this.qrValue, {
        code: this.qrValue,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err, 'err');
    }
  }
  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }
  generateRandomAlphanumeric() {
    // Define the character set (0-9 and A-Z)
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Generate a random 6-character string
    let result = '';
    for (let i = 0; i < 6; i++) {
      // Get a random index from the characters string
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }
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
        let res = await this.authService.signin(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        if(res){
this.router.navigate(['/home']);
       this.authService.userData.set(res);
        }
        
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
