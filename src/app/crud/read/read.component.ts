import { Observable } from 'rxjs/Observable';
import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {

  @Input() fields: any;
  @Input() instance: any;
  @Input() paths: any;

  data: any;
  formControls: any;
  readForm: FormGroup;
  formErrors: any = {};
  loading: Boolean = true;

  constructor(private router: Router) { }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  goToEdit(): void {
    this.router.navigate([this.paths.editRedirect + this.instance.id]);
  }

  ngOnInit(): void {
    this.formControls = {};
    this.data = {};

    Object.keys(this.fields).map((key) => {
      if (!this.fields[key].showable) return;
      else {
        let editedValue: string;

        if (typeof this.instance[key] === 'string') {
          editedValue = this.instance[key];
        } else if (Array.isArray(this.instance[key])) {
          editedValue = this.instance[key].join(', ');

        } else if (typeof this.instance[key] === 'object') {
          if (this.fields[key].optionLabelAccessor && this.instance[key]) {
            editedValue = this.instance?.[key]?.[this.fields[key].optionLabelAccessor] || 'Lost Label';
          }
        } else if (this.fields[key].defaultValue) {
          editedValue = this.fields[key].defaultValue;

        } else {
          editedValue = '';
        }

        this.data[key] = this.fields[key];
        this.data[key].id = this.fields[key].inputName + '-read';

        this.formControls[key] = new FormControl({ value: editedValue, disabled: true });
      }
    });

    this.readForm = new FormGroup(this.formControls);
    this.loading = false;
  }

}
@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value): any {
    if (!value) return null;
    return Object.keys(value);
  }
}
