import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../@core/auth/auth.service';
import { User } from '../../@core/models/user';

@Component({
  selector: 'ngx-institution-dashboard',
  styleUrls: ['./institution-dashboard.component.scss'],
  templateUrl: './institution-dashboard.component.html',
})

export class InstitutionDashboardComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => this.user = user);
  }
}

