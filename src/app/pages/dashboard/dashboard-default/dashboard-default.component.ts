import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/models/user';
import { TranslateService } from '@ngx-translate/core';

import { angularMaterialRenderers } from '@jsonforms/angular-material';

@Component({
  selector: 'ngx-dashboard-default',
  styleUrls: ['./dashboard-default.component.scss'],
  templateUrl: './dashboard-default.component.html',
})

export class DashboardDefaultComponent implements OnInit {

  user: User;

  dataschema: any =  {
    'type': 'object',
    'properties': {
      'online': {
        'type': 'boolean',
        'title': 'Analyze learner identity during the assessment',
        'default': true,
      },
      'offline': {
        'type': 'boolean',
        'title': 'Analyze learner identity on the delivered assessment',
        'default': false,
      },
      'test_date_picker': {
        'type': 'date',
        'title' : 'This is a date picker test',
      },
      // 'test_string_picker': {
      //   'type': 'string',
      //   'title' : 'This is a string input',
      // },
      // 'test_number_picker': {
      //   'type': 'number',
      //   'title' : 'This is a number input',
      // },
    },
  };

  data: any = {

  };

  renderers = angularMaterialRenderers;

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    this.authService.getUser()
      .pipe()
      .subscribe((user: User) => {
        if (user) this.user = user;
      });
  }
}


