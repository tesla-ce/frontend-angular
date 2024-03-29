import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiInstitutionService } from '../../../@core/data/api-institution.service';

@Component({
  selector: 'ngx-select-remote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-remote.component.html',
})

export class SelectRemoteComponent implements OnInit {
  @Input() field: any;
  @Input() parentForm: FormGroup;
  @Input() initialValue: any;

  formControl: FormControl;
  internForm: FormGroup;
  apiService: ApiInstitutionService;
  options: any[];
  value: string;
  firstRender = true;

  constructor(apiService: ApiInstitutionService) {
    this.apiService = apiService;
  }

  ngOnInit() {
    this.internForm = new FormGroup({
      intern: new FormControl(
        this.initialValue?.[this.field.optionValueAccessor] ?
        this.initialValue?.[this.field.optionLabelAccessor] ?
        this.initialValue?.[this.field.optionLabelAccessor] : '-' : null),
    });

    if (this.initialValue?.[this.field.optionValueAccessor] ) {
      this.parentForm.controls[this.field.key].setValue(this.initialValue[this.field.optionValueAccessor]);
    }

    this.apiService.getAll({[this.field.search || 'search'] : this.value }).subscribe( options => {
      this.options = options;
    });
  }

  filter(value = '', options: any[]): any[] {
    const filterValue = value?.toLowerCase();
    return options.filter((option) => option[this.field.optionLabelAccessor]?.toLowerCase()?.includes(filterValue));
  }

  async onModelChange(value: string) {
    if (this.firstRender) return this.firstRender = false;
    const picked = this.options?.filter((option) => option[this.field.optionLabelAccessor].indexOf(value)!==-1);
    if (picked?.length > 0) this.parentForm.controls[this.field.key].setValue(picked[0][this.field.optionValueAccessor]);
    else {
      this.parentForm.controls[this.field.key].setValue(null);
      if (!this.internForm.controls.intern.pristine)this.parentForm.controls[this.field.key].markAsTouched();
    }

    this.apiService.getAll({[ this.field.search || 'search'] : value }).subscribe( options => {
      this.options = this.filter(value, options);

    });
  }
}
