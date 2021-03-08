import { Observable } from 'rxjs/Observable';
import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {

  @Input() fields: any;
  @Input() instance: any;

  data: any;  
  formControls: any;
  formGroup: FormGroup;
  formErrors: any = {};
  loading: Boolean = true;

  constructor() { }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  ngOnInit(): void {
    this.formControls = {};
    this.data = {}

    Object.keys(this.fields).map((key) => {
      if(!this.fields[key].showable) return
      else {
        this.data[key] = this.fields[key]
        this.formControls[key] = new FormControl(
        this.fields[key].defaultValue ||
        (this.instance[key] && (Array.isArray(this.instance[key]) || typeof this.instance[key] !== 'object')) ? {value: this.instance[key], disabled: true} : null);
      }
    });

    this.formGroup = new FormGroup(this.formControls);
  }

}
@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value): any {
    if (!value) return null;
    return Object.keys(value);
  }
}
