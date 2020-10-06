import { Component } from '@angular/core';

import {MENU_ITEMS} from '../shared/admin-menu';

@Component({
  selector: 'ngx-instructor',
  styleUrls: ['instructor.component.scss'],
  templateUrl: './instructor.component.html',
})
export class InstructorComponent {

  menu = MENU_ITEMS;
}
