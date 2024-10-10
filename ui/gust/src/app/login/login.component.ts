import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  currentStep: number = 1;
  emailOrPhoneNumber: string = '';
  otp: string = '';
  isEmail: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  nextStep(loginForm: NgForm) {
    if (loginForm.valid) {
      const payload = this.isEmail
        ? { email: this.emailOrPhoneNumber }
        : { phoneNumber: this.emailOrPhoneNumber };

      this.authService.UserLogin(payload).subscribe(
        (response) => {
          console.log('OTP sent successfully:', response);
          this.currentStep++;
        },
        (error) => {
          console.error('Failed to send OTP:', error);
        }
      );
    }
  }

  prevStep() {
    this.currentStep--;
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const payload = {
        otp: this.otp,
        ...(this.isEmail ? { email: this.emailOrPhoneNumber } : { phoneNumber: this.emailOrPhoneNumber })
      };

      this.authService.ProcessOpt(payload).subscribe(
        (response) => {
          console.log('OTP verification successful:', response);
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
