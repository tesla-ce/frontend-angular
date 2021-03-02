import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../@core/auth/auth.service';
import { User } from '../../@core/models/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-admin-dashboard',
  styleUrls: ['./admin-dashboard.component.scss'],
  templateUrl: './admin-dashboard.component.html',
})

export class AdminDashboardComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => {
        this.user = user;
        // console.log(user);
      });
  }
}

