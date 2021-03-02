import { query } from '@angular/animations';
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
  @Input() errors: Observable<any>;
  @Output() save: EventEmitter<any> = new EventEmitter();

  formControls: any;
  formErrors: any = {};
  formGroup: FormGroup;

  loading: Boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.formControls = {};
    this.loading = false;
    Object.keys(this.fields).map((key) => {
      this.formControls[key] = new FormControl(this.instance[key] || this.fields[key].defaultValue || null);
      // if (field.type.includes('remote') {
      //   field.options = result from query...
      // }
    });
    this.errors.subscribe(errors => {
      this.formErrors = errors;
    });

    this.formGroup = new FormGroup(this.formControls);
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

