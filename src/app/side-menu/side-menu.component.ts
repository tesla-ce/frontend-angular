import { Component, OnInit } from '@angular/core';
import {AuthService } from '../@core/auth/auth.service';
import {MENU_ITEMS} from './side-menu.config';
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
        // TO DO Load menu by roles
        this.menu = MENU_ITEMS;
    });
  }

}
