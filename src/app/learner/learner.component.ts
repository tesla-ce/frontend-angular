import { Component } from '@angular/core';

import { MENU_ITEMS } from './learner-menu';

@Component({
  selector: 'ngx-learner',
  styleUrls: ['learner.component.scss'],
  templateUrl: './learner.component.html',
})
export class LearnerComponent {

  menu = MENU_ITEMS;
}
