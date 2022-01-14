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
  @Input() paths: any;
  @Input() errors: Observable<any>;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() valueChanges: EventEmitter<any> = new EventEmitter();

  formControls: any;
  updateForm: FormGroup;
  formErrors: any = {};
  loading = true;
  data: any;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
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
    this.data = {};
    this.loading = false;
    Object.keys(this.fields).map((key) => {
      if (!this.fields[key].editable) return;
      else {
        this.data[key] = this.fields[key];
        this.formControls[key] = new FormControl(
            this.fields[key].dataType === 'json' ? JSON.stringify(this.instance[key]) : this.instance[key],
            this.fields[key]?.validator ? this.fields[key].validator() : null);
      }
    });

    this.errors.subscribe(errors => {
      this.formErrors = errors;
    });

    this.updateForm = new FormGroup(this.formControls);
    if (this.validator) this.updateForm.setValidators(this.validator());
    if (this.instance) this.markFormGroupTouched(this.updateForm);
    this.updateForm.valueChanges.subscribe(value => {
      if (this.valueChanges) this.valueChanges.emit(value);
    });
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
