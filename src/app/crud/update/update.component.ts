import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {

  @Input() fields: any;
  @Input() instance: any;
  @Input() validator: any;
  @Input() errors: Observable<any>;
  @Output() save: EventEmitter<any> = new EventEmitter();

  formControls: any;
  updateForm: FormGroup;
  formErrors: any = {};
  loading: Boolean = true;

  constructor() { }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

    private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ngOnInit(): void {
    this.formControls = {};
    this.loading = false;
    Object.keys(this.fields).map((key) => {
        this.formControls[key] = new FormControl(
        this.fields[key].defaultValue ||
        (this.instance[key] && (Array.isArray(this.instance[key]) || typeof this.instance[key] !== 'object')) ? this.instance[key] : null , this.fields[key]?.validator ?
        this.fields[key].validator() :
        null);
        if (!this.fields[key].editable) this.fields[key].disabled = true
        else this.fields[key].disabled = false
    });

    this.errors.subscribe(errors => {
      this.formErrors = errors;
    });

    this.updateForm = new FormGroup(this.formControls);
    if (this.validator) this.updateForm.setValidators(this.validator());
    if (this.instance) this.markFormGroupTouched(this.updateForm)
  }

  onSubmit() {
    this.save.emit(this.updateForm.value);
  }

}


@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value): any {
    if (!value) return null;
    return Object.keys(value);
  }
}
