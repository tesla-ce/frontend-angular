import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ApiIcService } from '../../../../@core/data/api-ic.service';
import { Ic } from '../../../../@core/models/ic';
import { InstitutionIcConfig } from '../institution-ic.config';
import 'ckeditor';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { AuthService } from '../../../../@core/auth/auth.service';
import { InstitutionUser } from '../../../../@core/models/user';
import { EnvService } from '../../../../@core/env/env.service';

@Component({
  selector: 'ngx-institution-ic-update',
  templateUrl: './institution-ic-update.component.html',
  styleUrls: ['./institution-ic-update.component.scss'],
})
export class InstitutionIcUpdateComponent implements OnInit {
  @ViewChild('escClose', { read: TemplateRef }) escCloseTemplate: TemplateRef<HTMLElement>;

  windowRef: any;
  public id: number;
  private user: InstitutionUser;
  public instance: Ic;
  public fields = InstitutionIcConfig.fields;
  ckEditorConfig = { extraPlugins: 'divarea', height: '320', removePlugins: 'tableselection,scayt' };
  public errors = new Subject();
  formControls: any;
  formErrors: any = {};
  formGrupIC: FormGroup;
  formGrupDocument: FormGroup;
  toUpdate: any = {};
  toCreate: any = {};
  toDelete: string;
  options: any[];
  languages: any[] = [];
  loading = true;
  picked: string;
  hasDocument: any = {};
  regexPDF = /[0-9A-Za-z]+[.][Pp][Dd][Ff]/;

  documentFieldsModel = {
    pdf: {
      key: 'file',
      inputName: 'upload-pdf-input-name-',
      formControlName: 'upload-pdf-form-control-name-',
    },
    html: {
      key: 'html',
      inputName: 'html-input-name-',
      formControlName: 'html-form-control-name-',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiIcService: ApiIcService,
    private authService: AuthService,
    public translate: TranslateService,
    private envService: EnvService,
    private location: Location,
    private windowService: NbWindowService,
    private toastrService: NbToastrService) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
      } else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  back() { this.location.back(); }


  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.user = user;
        this.apiIcService.getIcDocument(user.institution.id, this.id).subscribe(list => {
          this.languages = list;
          const initialOptions = this.envService.availableLocales;
          for (let i = 0; i < list.length; i++) {
            this.toUpdate[list[i].language] = { html: list[i].html || '', file: list[i].file || null, language: list[i].language };
            const index = initialOptions.indexOf(list[i].language);
            initialOptions.splice(index, 1);
          }

          this.options = initialOptions;
          const group = {};

          list.map((item) => {
            if (!item.pdf) this.hasDocument[item.language] = { has: false };
            else {
              this.hasDocument[item.language] = { has: true, title: this.regexPDF.exec(item.pdf)[0] };
            }
            group[`${this.documentFieldsModel.html.formControlName}${item.language}`] = new FormControl(item.html);
            group[`${this.documentFieldsModel.pdf.formControlName}${item.language}`] = new FormControl();

          });
          this.formGrupDocument = new FormGroup(group);
          this.apiIcService.getIcById(user.institution.id, this.id).subscribe(instance => {
            this.instance = instance;
            this.formControls = {};
            this.loading = false;
            ['version', 'valid_from'].map((key) => {
              this.formControls[key] = new FormControl({
                value: this.instance[key] || this.fields[key].defaultValue || null,
                disabled: !this.fields[key].editable,
              });
            });
            this.formGrupIC = new FormGroup(this.formControls);
            this.loading = false;
          });
        });
      }
    });
  }

  changePDF(language: string): void {
    this.hasDocument[language].has = false;
    this.apiIcService.patchDocument(this.user.institution.id, this.id, language, {pdf: null}).subscribe();
  }

  newLenguage(): void {
    this.languages.push({ language: this.picked });
    const index = this.options.indexOf(this.picked);
    this.options.splice(index, 1);

    const group = {};
    group[`${this.documentFieldsModel.pdf.formControlName}${this.picked}`] = new FormControl(null);
    group[`${this.documentFieldsModel.html.formControlName}${this.picked}`] = new FormControl(null);
    if (this.formGrupDocument) {
      this.formGrupDocument.addControl(`${this.documentFieldsModel.pdf.formControlName}${this.picked}`, new FormControl(null));
      this.formGrupDocument.addControl(`${this.documentFieldsModel.html.formControlName}${this.picked}`, new FormControl(null));
    } else this.formGrupDocument = new FormGroup(group);

    this.toCreate[this.picked] = {};
    this.hasDocument[this.picked] = { has: false };

    this.picked = '';

  }

  pickedNewLanguage(event): void {
    this.picked = event;
  }

  deleteLenguage(language: string, index: number) {
    if (Object.keys(this.toCreate).indexOf(language) > -1) {
      delete this.toCreate[language];
      this.options.push(language);
      this.languages.splice(index, 1);
      this.picked = null;
      return;
    }
    this.toDelete = language;

    this.windowRef = this.windowService.open(
      this.escCloseTemplate,
      { title: 'Delete Language', hasBackdrop: true },
    );
  }

  delete() {
    this.windowRef.close();
    this.apiIcService.deleteDocument(this.user.institution.id, this.id, this.toDelete).subscribe(() => {
      this.ngOnInit();
    });

  }

  update(): void {
    const values = this.formGrupDocument.value;

    const toCreateKeys = Object.keys(this.toCreate);

    toCreateKeys.map(key => {
      this.toCreate[key].form = { pdf: values[`${this.documentFieldsModel.pdf.formControlName}${key}`]?.[0] };
      this.toCreate[key].form.html = values[`${this.documentFieldsModel.html.formControlName}${key}`] || '';
      this.toCreate[key].form.language = key;

    });

    const toUpdateKeys = Object.keys(this.toUpdate);
    const toUpdateConfirm = [];

    toUpdateKeys.map(key => {
      if (this.toUpdate[key].html !== values[`${this.documentFieldsModel.html.formControlName}${key}`] ||
        (!this.hasDocument[key].has && this.hasDocument[key].title) ||
        values[`${this.documentFieldsModel.pdf.formControlName}${key}`]?.[0]) {

        this.toUpdate[key].form = { pdf: values[`${this.documentFieldsModel.pdf.formControlName}${key}`]?.[0] || undefined };
        this.toUpdate[key].form.html = values[`${this.documentFieldsModel.html.formControlName}${key}`] || '';
        this.toUpdate[key].form.language = key;

        toUpdateConfirm.push(key);
      }
    });

    for (let c = 0; c < toCreateKeys.length; c++) {
      this.apiIcService.createDocument(this.user.institution.id, this.id, this.toCreate[toCreateKeys[c]].form).subscribe(() => {
        this.toUpdate[toCreateKeys[c]] = {};
        this.toUpdate[toCreateKeys[c]].html = this.toCreate[toCreateKeys[c]].form.html;
        this.toUpdate[toCreateKeys[c]].pdf = this.toCreate[toCreateKeys[c]].form.pdf;
        this.toUpdate[toCreateKeys[c]].language = this.toCreate[toCreateKeys[c]].form.language;
        delete this.toCreate[toCreateKeys[c]];

        this.toastrService.show(
          'Document Created',
          toCreateKeys[c],
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
          'Document',
          {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            status: 'danger',
            icon: 'save-outline',
            duration: 2000,
          });
      });
    }

    for (let u = 0; u < toUpdateConfirm.length; u++) {
      this.apiIcService.updateDocument(this.user.institution.id, this.id,
        this.toUpdate[toUpdateConfirm[u]].form,
        this.toUpdate[toUpdateConfirm[u]].language).subscribe(() => {
          this.toastrService.show(
            'Document Updated',
            toUpdateConfirm[u],
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
            'Document',
            {
              position: NbGlobalPhysicalPosition.TOP_RIGHT,
              status: 'danger',
              icon: 'save-outline',
              duration: 2000,
            });
        });
    }

    const valuesIC = this.formGrupIC.value;

    if (valuesIC.version !== this.instance.version || JSON.stringify(valuesIC.valid_from) !== JSON.stringify(this.instance.valid_from)) {
      this.apiIcService.updateIc(this.user.institution.id, this.instance.id, valuesIC).subscribe(() => {
        this.toastrService.show(
          'Ic Updated',
          valuesIC.version,
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
}
