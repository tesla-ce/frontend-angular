import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiInstitutionService } from '../../../@core/data/api-institution.service';
import { ApiService } from '../../../@core/data/api.service';

@Component({
  selector: 'ngx-select-remote',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // styleUrls: ['./select-remote.component.scss'],
  templateUrl: './select-remote.component.html',
})

export class SelectRemoteComponent implements OnInit {
  @Input() field: any;
  apiService: ApiInstitutionService;
  options: any[];
  value: string;

  constructor(apiService: ApiInstitutionService) {
    this.apiService = apiService;
  }

  ngOnInit() {
    this.apiService.getAll({[this.field.value.search || 'search'] : this.value }).subscribe( options => {
      this.options = options;
      console.log(options);
    });
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  async onModelChange(value: string) {
    this.apiService.getAll({[this.field.value.search || 'search'] : this.value }).subscribe( options => {
      this.options = options;
      console.log(options);
    });
  }
}
