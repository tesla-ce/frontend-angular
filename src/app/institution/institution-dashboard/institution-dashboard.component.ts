import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../@core/auth/auth.service';
import { User } from '../../@core/models/users';

@Component({
  selector: 'ngx-institution-dashboard',
  styleUrls: ['./institution-dashboard.component.scss'],
  templateUrl: './institution-dashboard.component.html',
})

export class InstitutionDashboardComponent implements OnInit {

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

