import { ApiInstitutionService } from './../../../@core/data/api-institution.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'nb-select-remote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-remote.component.html',
})
export class SelectRemoteComponent implements OnInit {
  @Input() field: any;
  @Input() parentFrom: FormGroup;

  options: string[];
  response: Observable<any>
  filteredControlOptions$: Observable<string[]>;
  filteredNgModelOptions$: Observable<string[]>;
  inputFormControl: FormControl;
  value: string;

  ngOnInit() {
    this.options = this.field.options || [];
    this.filteredControlOptions$ = of(this.options);
    this.filteredNgModelOptions$ = of(this.options);

    this.inputFormControl = new FormControl();
    this.filteredControlOptions$ = this.inputFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  async onModelChange(value: string) {
    this.options = this.field?.apiService.getAll({[this.field.search || "search"]: value })
    
    console.log(this.options)

    this.filteredNgModelOptions$ = of(this.filter(value));
  }
}