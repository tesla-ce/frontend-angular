import { Component, OnInit } from '@angular/core';
import {InstitutionIcConfig} from '../institution-ic.config';
import 'ckeditor';

@Component({
  selector: 'ngx-institution-ic-create',
  templateUrl: './institution-ic-create.component.html',
  styleUrls: ['./institution-ic-create.component.scss'],
})
export class InstitutionIcCreateComponent implements OnInit {

  fields = InstitutionIcConfig.fields;
  ckEditorConfig = { extraPlugins: 'divarea', height: '320' };
  constructor() {}

  ngOnInit(): void {
  }

  onSave(event): void {
    console.log('event recieved', event);
  }
}
