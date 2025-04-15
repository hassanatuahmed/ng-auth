import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit  {
  loginForm!: FormGroup;
  showSignUp: boolean = false;





  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  async onLogin() {
    if(this.loginForm.valid){
      const {email,password} = this.loginForm.value
      try {
        await this.authService.login((email), (password));
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Login error:', error);
      }

    }
 
  }

  onGoToSignUp() {
    this.router.navigate(['/signup']);
  }
}
