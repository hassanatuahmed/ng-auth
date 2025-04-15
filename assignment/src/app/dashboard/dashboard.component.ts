import { Component, inject, OnInit, } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit  {

  user: any;


  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authState$.subscribe(user => {
      this.user = user;
    });
  }

  async logout() {
    await this.authService.logout();
  }


  }
