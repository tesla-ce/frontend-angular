import { Component, OnInit, Input, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ApiInstitutionService } from '../../../../../@core/data/api-institution.service';
import { ListCellDisabledInstrumentsComponent } from '../../institution-send-category/institution-send-category-list/list-cell-disabled-instruments.component';
import { ListCellEnabledOptionsComponent } from '../../institution-send-category/institution-send-category-list/list-cell-enabled-options.component';

@Component({
  selector: 'ngx-institution-send-user-category-edit',
  templateUrl: './institution-send-user-category-edit.component.html',
  styleUrls: ['./institution-send-user-category-edit.component.scss'],
})
export class InstitutionSendUserCategoryEditComponent implements OnInit {

  @Input() institutionId: number;
  @Input() userId: number;
  @Input() sendUserCategoryId: number;
  endpoint: string;
  selectedCategory: any;
  selectedDate: Date;
  settings: any;

  constructor(
    private apiInstitutionService: ApiInstitutionService,
    private apiCourseService: ApiCourseService,
    @Optional() protected ref: NbDialogRef<InstitutionSendUserCategoryEditComponent>,
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

    this.apiInstitutionService.updateSendUserCategory(
      this.institutionId,
      this.userId,
      this.sendUserCategoryId,
      data).subscribe(() => {
        if (this.ref) this.ref.close(data);
    });
  }

}
