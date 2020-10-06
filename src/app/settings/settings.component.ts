import { Component } from '@angular/core';

import {MENU_ITEMS} from '../shared/admin-menu';

@Component({
  selector: 'ngx-settings',
  styleUrls: ['settings.component.scss'],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {

  menu = MENU_ITEMS;
}
