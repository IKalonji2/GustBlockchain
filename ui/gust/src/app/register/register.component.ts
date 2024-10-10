import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserFormObject } from '../model/user-object';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  currentStep: number = 1;
  emailOrPhoneNumber: string = '';
  otp: string = '';
  isEmail: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  nextStep(registerForm: NgForm) {
    if (registerForm.valid) {
      const payload = this.isEmail
        ? { email: this.emailOrPhoneNumber }
        : { phoneNumber: this.emailOrPhoneNumber };

      this.authService.CreateUser(payload).subscribe(
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

  onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
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
