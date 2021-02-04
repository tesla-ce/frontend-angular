import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ApiIcService } from '../../../@core/data/api-ic.service';
import { Ic } from '../../../@core/models/ic';
import { InstitutionIcConfig } from '../institution-ic.config';
import 'ckeditor';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-institution-ic-update',
  templateUrl: './institution-ic-update.component.html',
  styleUrls: ['./institution-ic-update.component.scss'],
})
export class InstitutionIcUpdateComponent implements OnInit {

  public id: number;
  public instance: Ic;
  public fields = InstitutionIcConfig.fields;
  ckEditorConfig = { extraPlugins: 'divarea', height: '320' };
  public errors = new Subject();
  formControls: any;
  formErrors: any = {};
  formGroup: FormGroup;

  loading: Boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiIcService: ApiIcService,
    private toastrService: NbToastrService) {
      this.route.params.subscribe(params => {
        if (params['id'] != null ) {
          this.id = params['id'];
          apiIcService.getIcById(this.id).subscribe(instance => {
            this.instance = instance;
            this.formControls = {};
            this.loading = false;
            Object.keys(this.fields).map((key) => {
              this.formControls[key] = new FormControl(this.instance[key] || this.fields[key].defaultValue || null);
            });
            this.formGroup = new FormGroup(this.formControls);
            this.loading = false;
          });
        } else {
          router.navigate(['../'], {relativeTo: this.route});
        }
      });
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.apiIcService.updateIc(this.id, this.formGroup.value).subscribe((ic: Ic) => {
        this.toastrService.show(
          'Ic Updated',
          ic.version,
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
        'ic',
        {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          status: 'danger',
          icon: 'save-outline',
          duration: 2000,
      });
    });
  }

}
