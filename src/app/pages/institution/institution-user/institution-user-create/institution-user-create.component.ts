import { Component, OnInit } from '@angular/core';
import {InstitutionUserConfig} from './institution-user-create.config';

@Component({
  selector: 'ngx-institution-user-create',
  templateUrl: './institution-user-create.component.html',
  styleUrls: ['./institution-user-create.component.scss'],
})
export class InstitutionUserCreateComponent implements OnInit {

  fields = InstitutionUserConfig.fields;

  constructor() { }

  ngOnInit(): void {
  }

  onSave(event): void {
    // console.log('event recieved', event);
  }
}
