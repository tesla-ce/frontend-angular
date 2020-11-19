import { Component, LOCALE_ID, Inject, OnInit } from '@angular/core';
import {AuthService } from '../@core/auth/auth.service';
import { User } from '../@core/models/users';

@Component({
  selector: 'ngx-admin',
  styleUrls: ['admin.component.scss'],
  templateUrl: './admin.component.html',
})

export class AdminComponent implements OnInit {

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
