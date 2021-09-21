import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ApiInstitutionService } from '../../../../../@core/data/api-institution.service';
import { InstitutionUser, User } from '../../../../../@core/models/user';
import { ListCellActionsComponent } from '../../../../../crud/list/list-cell-actions.component';
import { ListCellDisabledInstrumentsComponent } from '../../institution-send-category/institution-send-category-list/list-cell-disabled-instruments.component';
import { ListCellEnabledOptionsComponent } from '../../institution-send-category/institution-send-category-list/list-cell-enabled-options.component';
import { InstitutionSendUserConfig } from '../institution-send-user.config';
import { InstitutionSendUserCategoryAddComponent } from './institution-send-user-category-add.component';

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
            this.userSendCategories = userSendCategories;
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
                    defaultValue: {
                      update: {
                        enabled: false,
                      },
                      read: {
                        enabled: false,
                      },
                      delete: {
                        enabled: true,
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
                  'info.description': {
                    title: 'Description',
                  },
                  'info.enabled_options': {
                    title: 'Enabled options',
                    type: 'custom',
                    sort: false,
                    filter: false,
                    renderComponent: ListCellEnabledOptionsComponent,
                  },
                  'info.disabled_instruments': {
                    title: 'Disabled Instruments',
                    type: 'custom',
                    sort: false,
                    filter: false,
                    defaultValue: {
                      instruments: instruments,
                    },
                    renderComponent: ListCellDisabledInstrumentsComponent,
                  },
                  expires_at: {
                    title: 'Expiration date',
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
    .onClose.subscribe(sendCategory => {
      if (sendCategory) this.userSendCategories = [sendCategory, ...this.userSendCategories];
    });
  }

  removeCategory(event) {
    this.userSendCategories = this.userSendCategories.filter( category => category !== event.data );
  }
}
