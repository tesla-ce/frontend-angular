import { query } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {

  @Input() fields: any;
  @Input() instance: any;

  constructor() { }

  ngOnInit(): void {
    this.fields.map((field) => {
      // this.formControls[field.key] = new FormControl(field.defaultValue || null);
      // if (field.type.includes('remote') {
      //   field.options = result from query...
      // }
    });
  }
}
