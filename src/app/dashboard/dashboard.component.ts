import { Component } from '@angular/core';
import {MENU_ITEMS} from './dashboard-menu';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    menu = MENU_ITEMS;
}
