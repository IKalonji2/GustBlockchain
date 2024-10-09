import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserFormObject } from '../model/user-object';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  currentStep: number = 1;
  formData:UserFormObject = {
    emailOrNumber: '',
    otp: ''
  };

  constructor(
    private authService: AuthService
  ) {}
  ngOnInit(): void {

  }
  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }
  onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      console.log(this.formData);
    this.authService.CreateUser(this.formData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}

}
