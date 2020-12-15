import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  @Input() fields: any;
  @Input() createService: any;
  @Input() endPoint: string;

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
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.createService(this.profileForm.value)
    .subscribe(result => {
      // console.log(result)
    });
  }

}
