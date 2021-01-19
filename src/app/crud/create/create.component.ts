import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  @Input() fields: any;
  @Input() errors: Observable<any>;
  @Output() save: EventEmitter<any> = new EventEmitter();

  formControls: any;
  profileForm: FormGroup;
  formErrors: any = {};
  loading: Boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.formControls = {};
    this.loading = false;
    this.fields.map((field) => {
      this.formControls[field.key] = new FormControl(field.defaultValue || null);
      // if (field.type.includes('remote') {
      //   field.options = result from query...
      // }
    });
    this.errors.subscribe(errors => {
      this.formErrors = errors;
    });

    this.profileForm = new FormGroup(this.formControls);
  }

  onSubmit() {
    this.save.emit(this.profileForm.value);
  }

}
