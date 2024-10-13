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
  emailOrPhoneNumber: string = '';
  otp: string = '';
  isEmail: boolean = true;

  mnemonic: string[] = [];
  shuffledMnemonic: string[] = [];
  userSelectedMnemonic: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  nextStep(registerForm: NgForm) {
    if (registerForm.valid) {
      if (this.currentStep === 1) {
        const payload = this.isEmail
          ? { email: this.emailOrPhoneNumber }
          : { phoneNumber: this.emailOrPhoneNumber };

        this.authService.createUser(payload).subscribe(
          (response) => {
            console.log('OTP sent successfully:', response);
            this.currentStep++;
          },
          (error) => {
            console.error('Failed to send OTP:', error);
          }
        );
      } else if (this.currentStep === 2) {
        const payload = {
          otp: this.otp,
          ...(this.isEmail ? { email: this.emailOrPhoneNumber } : { phoneNumber: this.emailOrPhoneNumber })
        };
        this.authService.processOpt(payload).subscribe(
          (response) => {
            console.log('OTP verification successful:', response);
            this.currentStep++;
          },
          (error) => {
            console.error('OTP verification failed:', error);
          }

        );
        this.generatedMnemonic();
      }
      else if(this.currentStep === 3) {
        this.shuffleMnemonic();
        console.log("can you see me?")
      }
    }
  }

  prevStep() {
    this.currentStep--;
  }
  generatedMnemonic() {
    this.authService.getWalletMnemonic().subscribe(
      (generatedMnemonic:any) => {

        console.log("current step is 3 and I want to see : ",generatedMnemonic.mnemonic);

        this.mnemonic = generatedMnemonic.mnemonic.split(' ');
        this.currentStep++;
      },
      (error) => {
        console.error('Failed to get mnemonic:', error);
      }
    );
  }
  shuffleMnemonic() {
    this.authService.getShuffledMnemonic().subscribe(
      (shuffledMnemonic:any) => {
        this.shuffledMnemonic = shuffledMnemonic.shuffledMnemonic.split(' ');
        console.log('Shuffled mnemonic received:', this.shuffledMnemonic);
        this.currentStep++;
      },
      (error) => {
        console.error('Failed to get shuffled mnemonic:', error);
      }
    );
  }
  selectWord(word: string) {
    if (!this.userSelectedMnemonic.includes(word)) {
      this.userSelectedMnemonic.push(word);
    }
  }
  resetArrangement() {
    this.userSelectedMnemonic = [];
  }
  onSubmit() {
    this.currentStep = 4;
    if (this.userSelectedMnemonic.length === 12) {
      if (this.userSelectedMnemonic.join(' ') === this.mnemonic.join(' ')) {
        let mnemonicBody = {
          "mnemonic" : this.userSelectedMnemonic
        }
        alert('Mnemonic is correct');
        this.authService.verifyMnemonic(mnemonicBody);
        this.router.navigate(['/developer']);
      } else {
        alert('Mnemonic order is incorrect');
      }
    }
  }

  setActiveTab(tabNumber: number): void {
    this.currentStep = tabNumber;
  }

}
