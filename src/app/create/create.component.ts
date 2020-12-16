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

  profileForm: FormGroup;

  loading: Boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.loading = false;
    const formControls = {};
    this.fields.map(function(field) {
      formControls[field.key] = new FormControl(field.defaultValue || null);
    });

    this.profileForm = new FormGroup(formControls);
  }

  onSubmit() {
    console.log(this.profileForm.value);
    this.save.emit(this.profileForm.value);
  }

}
