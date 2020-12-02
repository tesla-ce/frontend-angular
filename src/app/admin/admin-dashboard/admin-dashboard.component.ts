import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../@core/auth/auth.service';
import { User } from '../../@core/models/users';

@Component({
  selector: 'ngx-admin-dashboard',
  styleUrls: ['./admin-dashboard.component.scss'],
  templateUrl: './admin-dashboard.component.html',
})

export class AdminDashboardComponent implements OnInit {

  user: User;
  JSON;

  constructor(
    private authService: AuthService,
  ) { this.JSON = JSON; }

  ngOnInit() {
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => this.user = user);
  }
}

