import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { ApiInstitutionService } from '../../../../../@core/data/api-institution.service';
import { InstitutionUser, User } from '../../../../../@core/models/user';
import { InstitutionSendUserConfig } from '../institution-send-user.config';

@Component({
  selector: 'ngx-institution-send-user-update',
  templateUrl: './institution-send-user-update.component.html',
  styleUrls: ['./institution-send-user-update.component.scss'],
})
export class InstitutionSendUserUpdateComponent implements OnInit {

  public id: number;
  public instance: User;
  public fields = null;
  public errors = new Subject();
  public paths = InstitutionSendUserConfig.paths;
  public selectedCategories: any[] = [];
  public user: InstitutionUser;
  endpoint: String;

  settings = {
    columns: {
      description: {
        title: 'Description',
      },
    },
    actions: {
      edit: false,
      add: false,
      delete: false,
    },
    mode: 'external',
    pager: {
      display: true,
      perPage: 10,
    },
    addNew: false,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiInstitutionService: ApiInstitutionService,
    private authService: AuthService,
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
      // if (user) this.endpoint = `/institution/${user.institution.id}/learner/${user.id}/send`;
      if (user) this.endpoint = `/institution/${user.institution.id}/send`;
    });
    this.selectedCategories = []; // get frome remote object
  }

  addCategory(event) {
    if (!this.selectedCategories.filter(category => category === event.data).length) {
      this.selectedCategories = [event.data, ...this.selectedCategories];
    }
  }

  removeCategory(event) {
    this.selectedCategories = this.selectedCategories.filter( category => category !== event.data );
  }

  onSave(event): void {
    if (this.instance) {
      this.apiInstitutionService.updateSendUser(this.id, this.user.id, event).subscribe((sendUser: any) => {
        this.toastrService.show(
          'Send User Updated',
          sendUser.id,
          {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: 'success',
            icon: 'save-outline',
            duration: 2000,
          });
      }, error => {
        this.errors.next(error.error);
        this.toastrService.show(
          'Error saving',
          'user',
          {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: 'danger',
            icon: 'save-outline',
            duration: 2000,
          });
      });
    } else {
      this.apiInstitutionService.createSendUser(this.id, this.user.id, event).subscribe((sendUser: any) => {
        this.toastrService.show(
          'Send User Updated',
          sendUser.id,
          {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: 'success',
            icon: 'save-outline',
            duration: 2000,
          });
      }, error => {
        this.errors.next(error.error);
        this.toastrService.show(
          'Error saving',
          'user',
          {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: 'danger',
            icon: 'save-outline',
            duration: 2000,
          });
      });
    }
  }

}
