import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserAuthRequest } from '../model/user-object';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  currentStep: number = 1;
  phone_number: string = '';
  otp: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  nextStep(loginForm: NgForm) {
    if (loginForm.valid) {
      let payload: UserAuthRequest;

      if (this.currentStep === 1) {
        if (!this.phone_number) {
          console.error('Phone number is required');
          return;
        }
        payload = { phone_number: this.phone_number, otp: '' };
        this.userService.setUser(this.phone_number);
      } else if (this.currentStep === 2) {
        if (!this.otp) {
          console.error('OTP is required');
          return;
        }
        const savedPhoneNumber = this.userService.getUser();
        payload = { phone_number: savedPhoneNumber, otp: this.otp };
      } else {
        console.error('Invalid step');
        return;
      }

      const serviceCall = this.currentStep === 1
        ? this.authService.userLogin(payload)
        : this.authService.processOtp(payload);

      serviceCall.subscribe(
        (response) => {
          console.log('Request successful:', response);
          if (this.currentStep === 1) {
            this.currentStep++;
          } else if (response.success) {
            console.log('OTP verification successful');
            // this.router.navigate(['/dashboard']);
          } else {
            console.error('OTP verification failed:', response.message);
          }
        },
        (error) => {
          console.error('Request failed:', error);
        }
      );
    }
  }

  prevStep() {
    this.currentStep--;
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const payload: UserAuthRequest = {
        phone_number: this.userService.getUser(),
        otp: loginForm.value.otp
      };
      console.log(payload);

      this.authService.processOtp(payload).subscribe(
        (response) => {
          console.log('OTP verification successful:', response);
          // localStorage.setItem('authToken', response.token);
          // this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('OTP verification failed:', error);
        }
      );
    }
  }

  setActiveTab(tabNumber: number): void {
    this.currentStep = tabNumber;
  }
}
