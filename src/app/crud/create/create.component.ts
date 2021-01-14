import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  @Input() fields: any;
  @Output() save: EventEmitter<any> = new EventEmitter();

  formControls: any;
  profileForm: FormGroup;

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

    this.profileForm = new FormGroup(this.formControls);
  }

  onSubmit() {
    this.save.emit(this.profileForm.value);
  }

}
