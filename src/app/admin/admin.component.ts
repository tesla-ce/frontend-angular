import { Component } from '@angular/core';

import {MENU_ITEMS} from '../shared/admin-menu';

@Component({
  selector: 'ngx-admin',
  styleUrls: ['admin.component.scss'],
  templateUrl: './admin.component.html',
})
export class AdminComponent {

  menu = MENU_ITEMS;
}
