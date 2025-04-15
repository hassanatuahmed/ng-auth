import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {
  private authService = inject(AuthService)
  private router = inject(Router)
  signupForm!:FormGroup;


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],

      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSignup() {
    if(this.signupForm.valid){
      const {email,name,password} = this.signupForm.value;

      try {

        await this.authService.signup(email, name, password);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Signup error:', error);
      }
    }else {
      console.log('Form is invalid');
    }
  
  }
}
