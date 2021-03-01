import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiInstitutionService } from '../../@core/data/api-institution.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  @Input() fields: any;
  @Input() validator: any;
  @Input() errors: Observable<any>;
  @Output() save: EventEmitter<any> = new EventEmitter();

  formControls: any;
  formGroup: FormGroup;
  formErrors: any = {};
  loading: Boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.formControls = {};
    this.loading = false;
    Object.keys(this.fields).map((key) => {
      console.log(this.fields[key]);
      this.formControls[key] = new FormControl(
        this.fields[key].defaultValue ||
        null, this.fields[key]?.validator ?
        this.fields[key].validator() :
        null);
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
