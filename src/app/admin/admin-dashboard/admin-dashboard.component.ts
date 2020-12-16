import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../@core/auth/auth.service';
import {ApiService } from '../../@core/data/api.service';
import { User } from '../../@core/models/users';

@Component({
  selector: 'ngx-admin-dashboard',
  styleUrls: ['./admin-dashboard.component.scss'],
  templateUrl: './admin-dashboard.component.html',
})

export class AdminDashboardComponent implements OnInit {

  user: User;
  retrievedUser: User;
  JSON;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
  ) { this.JSON = JSON; }

  ngOnInit() {
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => this.user = user);
    this.apiService.getUserById(1)
      .subscribe((retrievedUser: User) => this.retrievedUser = retrievedUser);
  }
}

