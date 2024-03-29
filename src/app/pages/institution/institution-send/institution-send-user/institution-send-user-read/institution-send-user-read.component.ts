import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ApiInstitutionService } from '../../../../../@core/data/api-institution.service';
import { InstitutionUser, User } from '../../../../../@core/models/user';
import { ListCellDisabledInstrumentsComponent } from '../../institution-send-category/institution-send-category-list/list-cell-disabled-instruments.component';
import { ListCellEnabledOptionsComponent } from '../../institution-send-category/institution-send-category-list/list-cell-enabled-options.component';
import { dateFormat } from '../../../../../@core/utils/utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-institution-send-user-read',
  templateUrl: './institution-send-user-read.component.html',
  styleUrls: ['./institution-send-user-read.component.scss'],
})
export class InstitutionSendUserReadComponent implements OnInit {

  public id: number;
  public instance: User;
  public learner: any;
  public fields = null;
  public errors = new Subject();
  public user: InstitutionUser;
  public userSendCategories: any[];
  public selectedCategory: any = null;
  public selectedDate: Date = null;

  endpoint: string;
  instruments: any;
  instrumentsAcronyms = {};
  icons = {
    big_fonts: 'text-height',
    text_to_speech: 'assistive-listening-systems',
    high_contrast: 'adjust',
  };


  settings: any;

  constructor(
    private route: ActivatedRoute,
    private apiInstitutionService: ApiInstitutionService,
    private apiCourseService: ApiCourseService,
    private authService: AuthService,
    private location: Location,
    private datePipe: DatePipe,
    private translate: TranslateService,
    private dialog: NbDialogService,
    private toastrService: NbToastrService) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
        this.instance = null;
      }
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      this.user = user;
      if (user) {
        this.apiInstitutionService.getLearnerById(user.institution.id, this.id).subscribe((learner: any) => {
          this.learner = learner;
          this.apiInstitutionService.getSendUserCategories(user.institution.id, this.id).subscribe((userSendCategories: any[]) => {
            this.userSendCategories = userSendCategories.map(userSendCategory => {
              userSendCategory.description = userSendCategory.info.description;
              userSendCategory.data = userSendCategory.info.data;
              return userSendCategory;
            });
            this.apiCourseService.getAllInstruments(this.user.institution.id).subscribe((instruments: any) => {
              this.instruments = instruments;
              instruments.map((instrument) => {
                this.instrumentsAcronyms[instrument.id + '' ] = instrument.acronym;
              });
              this.settings = {
                actions: {
                  edit: false,
                  add: false,
                  delete: false,
                },
                columns: {
                  category: {
                    title: this.translate.instant('ENTITIES.NAMES.SEND_CATEGORY') + ' ' + this.translate.instant('ENTITIES.SEND_CATEGORY.ID'),
                  },
                  description: {
                    title: this.translate.instant('ENTITIES.SEND_CATEGORY.DESCRIPTION'),
                  },
                  enabled_options: {
                    title: this.translate.instant('ENTITIES.SEND_CATEGORY.ENABLED_OPTIONS'),
                    type: 'custom',
                    sort: false,
                    filter: false,
                    renderComponent: ListCellEnabledOptionsComponent,
                  },
                  disabled_instruments: {
                    title: this.translate.instant('ENTITIES.SEND_CATEGORY.DISABLED_INSTRUMENTS'),
                    type: 'custom',
                    sort: false,
                    filter: false,
                    defaultValue: {
                      instruments: this.instruments,
                    },
                    renderComponent: ListCellDisabledInstrumentsComponent,
                  },
                  expires_at: {
                    title: this.translate.instant('ENTITIES.SEND_CATEGORY.EXPIRATION_DATE'),
                    valuePrepareFunction: value => {
                      return this.datePipe.transform(value, dateFormat);
                    },
                  },
                },
                mode: 'external',
                pager: {
                  display: true,
                  perPage: 10,
                },
                addNew: false,
              };
            });
          });
        });
      }
    });
  }

  back() { this.location.back(); }
}
