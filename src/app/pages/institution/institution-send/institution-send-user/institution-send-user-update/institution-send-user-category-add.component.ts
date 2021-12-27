import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ApiInstitutionService } from '../../../../../@core/data/api-institution.service';
import { ListCellDisabledInstrumentsComponent } from '../../institution-send-category/institution-send-category-list/list-cell-disabled-instruments.component';
import { ListCellEnabledOptionsComponent } from '../../institution-send-category/institution-send-category-list/list-cell-enabled-options.component';

@Component({
  selector: 'ngx-institution-send-user-category-add',
  templateUrl: './institution-send-user-category-add.component.html',
  styleUrls: ['./institution-send-user-category-add.component.scss'],
})
export class InstitutionSendUserCategoryAddComponent implements OnInit {

  @Input() institutionId: number;
  @Input() userId: number;
  endpoint: string;
  selectedCategory: any;
  selectedDate: Date;
  settings: any;

  constructor(
    private apiInstitutionService: ApiInstitutionService,
    private apiCourseService: ApiCourseService,
    protected ref: NbDialogRef<InstitutionSendUserCategoryAddComponent>,
  ) {
  }

  ngOnInit() {

    this.apiCourseService.getAllInstruments(this.institutionId).subscribe((instruments: any) => {
      this.settings = {
        columns: {
          description: {
            title: 'Description',
          },
          enabled_options: {
            title: 'Enabled options',
            type: 'custom',
            sort: false,
            filter: false,
            renderComponent: ListCellEnabledOptionsComponent,
          },
          disabled_instruments: {
            title: 'Disabled Instruments',
            type: 'custom',
            sort: false,
            filter: false,
            defaultValue: {
              instruments: instruments,
            },
            renderComponent: ListCellDisabledInstrumentsComponent,
          },
        },
        actions: {
          edit: false,
          add: false,
          delete: false,
        },
        mode: 'external',
      };
      this.endpoint = `/institution/${this.institutionId}/send`;
    });
  }

  dismiss() {
    this.ref.close();
  }

  selectCategory(event) {
    this.selectedCategory = event.data;
  }

  onSave() {
    const data: any = {
      category: this.selectedCategory.id,
      description: this.selectedCategory.description,
      data: {
        enabled_options: this.selectedCategory.data.enabled_options,
        disabled_instruments: this.selectedCategory.data.disabled_instruments,
      },
    };

    if (this.selectedDate) data.expires_at = this.selectedDate.toISOString();

    this.apiInstitutionService.createSendUserCategory(this.institutionId, this.userId, data).subscribe(() => {
      this.ref.close(data);
    });
  }

}
