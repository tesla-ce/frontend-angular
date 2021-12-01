import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ApiInstitutionService } from '../../../../../@core/data/api-institution.service';
import { InstitutionUser, User } from '../../../../../@core/models/user';
import { dateFormat } from '../../../../../@core/utils/utils';
import { ListCellActionsComponent } from '../../../../../crud/list/list-cell-actions.component';
import { ListCellDisabledInstrumentsComponent } from '../../institution-send-category/institution-send-category-list/list-cell-disabled-instruments.component';
import { ListCellEnabledOptionsComponent } from '../../institution-send-category/institution-send-category-list/list-cell-enabled-options.component';
import { InstitutionSendUserConfig } from '../institution-send-user.config';
import { InstitutionSendUserCategoryAddComponent } from './institution-send-user-category-add.component';
import { InstitutionSendUserCategoryEditComponent } from './institution-send-user-category-edit.component';

@Component({
  selector: 'ngx-institution-send-user-update',
  templateUrl: './institution-send-user-update.component.html',
  styleUrls: ['./institution-send-user-update.component.scss'],
})
export class InstitutionSendUserUpdateComponent implements OnInit {

  public id: number;
  public instance: User;
  public learner: any;
  public fields = null;
  public errors = new Subject();
  public paths = InstitutionSendUserConfig.paths;
  public user: InstitutionUser;
  public userSendCategories: any[];
  public selectedCategory: any = null;
  public selectedDate: Date = null;

  endpoint: String;
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
    private router: Router,
    private apiInstitutionService: ApiInstitutionService,
    private apiCourseService: ApiCourseService,
    private authService: AuthService,
    private location: Location,
    private datePipe: DatePipe,
    private dialog: NbDialogService,
    private toastrService: NbToastrService) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
        this.instance = null;
      } else {
        router.navigate(['../'], { relativeTo: this.route });
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
                  actions: {
                    title: 'Actions',
                    type: 'custom',
                    sort: false,
                    filter: false,
                    renderComponent: ListCellActionsComponent,
                    onComponentInitFunction: (instance) => {
                      instance.remove.subscribe(data => {
                          this.remove(data);
                      });
                      instance.edit.subscribe(data => {
                        this.edit(data);
                    });
                    },
                    defaultValue: {
                      update: {
                        enabled: true,
                      },
                      read: {
                        enabled: false,
                      },
                      delete: {
                        enabled: true,
                        accessor: 'category',
                      },
                      report: {
                        enabled: false,
                        path: 'activity',
                      },
                    },
                  },
                  category: {
                    title: 'Category Id',
                  },
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
                      instruments: this.instruments,
                    },
                    renderComponent: ListCellDisabledInstrumentsComponent,
                  },
                  expires_at: {
                    title: 'Expiration date',
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

  create(event) {
    this.dialog.open(
      InstitutionSendUserCategoryAddComponent, { context: {
        institutionId: this.user.institution.id,
        userId: this.id,
      }})
    .onClose.subscribe(userSendCategory => {
      // if (userSendCategory) this.userSendCategories = [userSendCategory, ...this.userSendCategories];
      this.ngOnInit();
    });
  }

  edit(event) {
    this.dialog.open(
      InstitutionSendUserCategoryEditComponent, { context: {
        institutionId: this.user.institution.id,
        userId: this.id,
        sendUserCategoryId: event.id,
      }})
    .onClose.subscribe(userSendCategory => {
      // if (userSendCategory) this.userSendCategories = [userSendCategory, ...this.userSendCategories];
      this.ngOnInit();
    });
  }

  remove(data): void {
    this.apiInstitutionService.deleteSendUserCategoryById(this.user.institution.id, this.id, data.id).subscribe(response => {
      this.toastrService.show(
        'User Send Category deleted',
        '',
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'success',
          icon: 'save-outline',
          duration: 2000,
        });
        this.ngOnInit();
    },
    error => {
      this.toastrService.show(
        'Error',
        '',
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'danger',
          icon: 'save-outline',
          duration: 2000,
        });
    });
  }

  back() { this.location.back(); }
}
