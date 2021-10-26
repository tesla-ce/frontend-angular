import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  @Input() fields: any;
  @Input() validator: any = null;
  @Input() errors: Observable<any>;
  @Output() save: EventEmitter<any> = new EventEmitter();

  usableFields: {};
  formControls: any;
  formGroup: FormGroup;
  formErrors: any = {};
  loading: Boolean = true;

  constructor() { }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  ngOnInit(): void {
    this.formControls = {};
    this.usableFields = {};

    this.loading = false;
    Object.keys(this.fields).map((key) => {
      if (this.fields[key].creable) {
        this.usableFields[key] = this.fields[key];
        this.formControls[key] = new FormControl(
          this.fields[key].defaultValue !== undefined ? this.fields[key].defaultValue : null,
          this.fields[key]?.validator ? this.fields[key].validator() : null );
        this.fields[key].disabled = false;
      } else {
        this.fields[key].disabled = true;
      }
    });
    this.errors.subscribe(errors => {
      this.formErrors = errors;
    });

    this.formGroup = new FormGroup(this.formControls);
    if (this.validator) this.formGroup.setValidators(this.validator());

  }

  onSubmit() {
    this.save.emit(this.formGroup.value);
  }

}


@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value): any {
    if (!value) return null;
    return Object.keys(value);
  }
}
