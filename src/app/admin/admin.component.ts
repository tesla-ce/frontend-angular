import { Component, LOCALE_ID, Inject } from '@angular/core';
import {MENU_ITEMS} from '../shared/admin-menu';

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

export class AdminComponent {
  constructor(
    @Inject(LOCALE_ID) public userLocale: string
  ) { }
  browserLocale = getUsersLocale('en-US');
  menu = MENU_ITEMS;
}
