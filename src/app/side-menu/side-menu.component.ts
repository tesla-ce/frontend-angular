import { Component, OnInit } from '@angular/core';
import {AuthService } from '../@core/auth/auth.service';
import {MENU_ITEMS} from './menu-items';
import {MENU_ITEMS_ADMIN} from './menu-items-admin';
import { User } from '../@core/models/user';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  user: User;
  menu: NbMenuItem[];

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => {
        this.user = user;
        this.menu = user ? user.is_admin ? MENU_ITEMS_ADMIN : MENU_ITEMS : [];
    });
  }

}
