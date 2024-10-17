import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserFormObject } from '../model/user-object';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  currentStep: number = 1;
  phone_number: string = '';
  otp: string = '';
  // isEmail: boolean = true;

  // mnemonic: string[] = [];
  // shuffledMnemonic: string[] = [];
  // userSelectedMnemonic: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  nextStep(registerForm: NgForm) {
    if (registerForm.valid) {
      if (this.currentStep === 1) {
        // const payload = this.isEmail
        //   ? { email: this.emailOrphone_number }
        //   : { phone_number: this.emailOrphone_number };
        const payload = {phone_number:this.phone_number}

        this.authService.createUser(payload).subscribe(
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
  }

  prevStep() {
    this.currentStep--;
  }

  onSubmit() {
    this.currentStep = 2;
    const payload = {phone_number:this.phone_number}

    this.authService.processOpt(payload).subscribe(
      (response) => {
        console.log('OTP verification successful:', response);
        this.currentStep++;
      },
      (error) => {
        console.error('OTP verification failed:', error);
      }

    );
  }

  setActiveTab(tabNumber: number): void {
    this.currentStep = tabNumber;
  }

}
