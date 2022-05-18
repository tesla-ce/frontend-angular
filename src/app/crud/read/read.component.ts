import { KeyValue } from '@angular/common';
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
  @Input() validator: any;
  @Input() paths: any;
  // @Input() errors: Observable<any>;
  @Output() save: EventEmitter<any> = new EventEmitter();

  formControls: any;
  readForm: FormGroup;
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
      if (!this.fields[key].showable || this.instance[key] === undefined) return;
      else {
        this.data[key] = this.fields[key];
        this.formControls[key] = new FormControl(
            this.instance[key],
            null);
      }
    });

    this.readForm = new FormGroup(this.formControls);
    if (this.instance) this.markFormGroupTouched(this.readForm);
    this.readForm.disable();
  }

}