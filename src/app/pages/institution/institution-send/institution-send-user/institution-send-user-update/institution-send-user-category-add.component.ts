import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { NbDialogRef, NbWindowService } from '@nebular/theme';
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


  back() {

  }

  onSave() {
    const data = {
      expires_at: this.selectedDate.toISOString(),
      category: this.selectedCategory.id,
    };

    this.apiInstitutionService.createSendUserCategory(this.institutionId, this.userId, data).subscribe((response) => {
      this.ref.close(data);
    });
  }

}
