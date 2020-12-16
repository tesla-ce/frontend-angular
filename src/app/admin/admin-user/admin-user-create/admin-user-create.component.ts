import { Component, OnInit } from '@angular/core';
import {AdminUserConfig} from './admin-user-create.config';

@Component({
  selector: 'ngx-admin-user-create',
  templateUrl: './admin-user-create.component.html',
  styleUrls: ['./admin-user-create.component.scss']
})
export class AdminUserCreateComponent implements OnInit {

  fields = AdminUserConfig.fields;

  constructor() { }

  ngOnInit(): void {
  }

  onSave(event): void {
    console.log('event recieved', event);
  }
}
