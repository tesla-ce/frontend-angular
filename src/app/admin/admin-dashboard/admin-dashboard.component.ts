import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../@core/auth/auth.service';
import { User } from '../../@core/models/user';

@Component({
  selector: 'ngx-admin-dashboard',
  styleUrls: ['./admin-dashboard.component.scss'],
  templateUrl: './admin-dashboard.component.html',
})

export class AdminDashboardComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => this.user = user);
  }
}

