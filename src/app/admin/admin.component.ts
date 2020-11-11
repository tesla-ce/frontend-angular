import { Component, LOCALE_ID, Inject, OnInit } from '@angular/core';
import {AuthService } from '../@core/auth/auth.service';
import { User } from '../@core/models/users';

export function getUsersLocale(defaultValue: string): string {
  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    return defaultValue;
  }
  const wn = window.navigator as any;
  let lang = wn.languages ? wn.languages[0] : defaultValue;
  lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
  return lang;
}

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
    @Inject(LOCALE_ID) public userLocale: string
  ) { this.JSON = JSON;}
  browserLocale = getUsersLocale('en-US');

  ngOnInit(){
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => this.user = user);
  }
}
