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

  dataschema: any = {
    'type': 'object',
    'properties': {
      'name': {
        'type': 'string',
        'minLength': 3,
        'description': 'Please enter your name',
      },
      'vegetarian': {
        'type': 'boolean',
      },
      'birthDate': {
        'type': 'string',
        'format': 'date',
      },
      'nationality': {
        'type': 'string',
        'enum': [
          'DE',
          'IT',
          'JP',
          'US',
          'RU',
          'Other',
        ],
      },
      'personalData': {
        'type': 'object',
        'properties': {
          'age': {
            'type': 'integer',
            'description': 'Please enter your age.',
          },
          'height': {
            'type': 'number',
          },
          'drivingSkill': {
            'type': 'number',
            'maximum': 10,
            'minimum': 1,
            'default': 7,
          },
        },
        'required': [
          'age',
          'height',
        ],
      },
      'occupation': {
        'type': 'string',
      },
      'postalCode': {
        'type': 'string',
        'maxLength': 5,
      },
    },
    'required': [
      'occupation',
      'nationality',
    ],
  };

  uischema: any = {
    'type': 'VerticalLayout',
    'elements': [
      {
        'type': 'HorizontalLayout',
        'elements': [
          {
            'type': 'Control',
            'scope': '#/properties/name',
          },
          {
            'type': 'Control',
            'scope': '#/properties/personalData/properties/age',
          },
          {
            'type': 'Control',
            'scope': '#/properties/birthDate',
          },
        ],
      },
      {
        'type': 'Label',
        'text': 'Additional Information',
      },
      {
        'type': 'HorizontalLayout',
        'elements': [
          {
            'type': 'Control',
            'scope': '#/properties/personalData/properties/height',
          },
          {
            'type': 'Control',
            'scope': '#/properties/nationality',
          },
          {
            'type': 'Control',
            'scope': '#/properties/occupation',
            'suggestion': [
              'Accountant',
              'Engineer',
              'Freelancer',
              'Journalism',
              'Physician',
              'Student',
              'Teacher',
              'Other',
            ],
          },
        ],
      },
    ],
  };

  data: any = {
    'name': 'John Doe',
    'vegetarian': false,
    'birthDate': '1985-06-02',
    'personalData': {
      'age': 34,
    },
    'postalCode': '12345',
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


