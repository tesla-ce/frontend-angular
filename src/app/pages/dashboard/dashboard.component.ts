import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../@core/auth/auth.service';
import { User } from '../../@core/models/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => {
        if (user) this.user = user;
      });
  }
}

