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
  formGrupIC: FormGroup;
  formGrupDocument: FormGroup;
  toUpdate: any = {};
  toCreate: any = {};
  toUse: any = {};
  options: any[];
  languages: any[] = []
  loading: boolean = true;
  picked: string;

  documentFieldsModel = {
    file: {
      key: 'file',
      inputName: 'upload-pdf-input-name-',
      formControlName: 'upload-pdf-form-control-name-',
    },
    html: {
      key: 'html',
      inputName: 'html-input-name-',
      formControlName: 'html-form-control-name-',
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiIcService: ApiIcService,
    private toastrService: NbToastrService) {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
      } else {
        router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnInit(): void {
    this.apiIcService.getIcDocument(this.id).subscribe(list => {
      this.languages = list
      const initialOptions = ["en", "es", "ru", "fr", "ca"]
      for (let i = 0; i < list.length; i++) {
        this.toUpdate[list[i].language] = { html: list[i].html || "", file: list[i].file || null, language: list[i].language }

        const index = initialOptions.indexOf(list[i].language)
        initialOptions.splice(index, 1)
      }

      this.options = initialOptions
      const group = {}

      list.map((item) => {
        group[`${this.documentFieldsModel.file.formControlName}${item.language}`] = new FormControl(item.file);
        group[`${this.documentFieldsModel.html.formControlName}${item.language}`] = new FormControl(item.html);
      });
      this.formGrupDocument = new FormGroup(group)

    })

    this.apiIcService.getIcById(this.id).subscribe(instance => {
      this.instance = instance;
      this.formControls = {};
      this.loading = false;
      Object.keys(this.fields).map((key) => {
        this.formControls[key] = new FormControl({ value: this.instance[key] || this.fields[key].defaultValue || null, disabled: !this.fields[key].editable });
      });
      this.formGrupIC = new FormGroup(this.formControls);
      this.loading = false;
    });
  }

  newLenguage(): void {
    this.languages.push({ language: this.picked })
    const index = this.options.indexOf(this.picked)
    this.options.splice(index, 1)

    const group = {}
    group[`${this.documentFieldsModel.file.formControlName}${this.picked}`] = new FormControl(null);
    group[`${this.documentFieldsModel.html.formControlName}${this.picked}`] = new FormControl(null);
    if (this.formGrupDocument) {
      this.formGrupDocument.addControl(`${this.documentFieldsModel.file.formControlName}${this.picked}`, new FormControl(null))
      this.formGrupDocument.addControl(`${this.documentFieldsModel.html.formControlName}${this.picked}`, new FormControl(null))
    } else this.formGrupDocument = new FormGroup(group)

    this.toCreate[this.picked] = {}
    this.toUse[this.picked] = {}

    this.picked = ""

  }

  pickedNewLenguage(event): void {
    this.picked = event;
  }

  update(): void {
    const values = this.formGrupDocument.value

    const toCreateKeys = Object.keys(this.toCreate)
    toCreateKeys.map(key => {
      this.toCreate[key].language = key
      this.toCreate[key].html = values[`${this.documentFieldsModel.html.formControlName}${key}`]
      this.toCreate[key].file = values[`${this.documentFieldsModel.file.formControlName}${key}`]
    })

    const toUpdateKeys = Object.keys(this.toUpdate)
    const toUpdateConfirm = []

    toUpdateKeys.map(key => {
      if (this.toUpdate[key].html !== values[`${this.documentFieldsModel.html.formControlName}${key}`] || this.toUpdate[key].file !== values[`${this.documentFieldsModel.file.formControlName}${key}`]) {
        this.toUpdate[key].html = values[`${this.documentFieldsModel.html.formControlName}${key}`]
        this.toUpdate[key].file = values[`${this.documentFieldsModel.file.formControlName}${key}`]
        this.toUpdate[key].languages = key
        toUpdateConfirm.push(key)
      }
    })

    for (let c = 0; c < toCreateKeys.length; c++) {
      this.apiIcService.createDocument(this.id, this.toCreate[toCreateKeys[c]]).subscribe((ic: Ic) => {
        this.toUpdate[toCreateKeys[c]] = {}
        this.toUpdate[toCreateKeys[c]].html = this.toCreate[toCreateKeys[c]].html
        this.toUpdate[toCreateKeys[c]].file = this.toCreate[toCreateKeys[c]].file
        this.toUpdate[toCreateKeys[c]].language = this.toCreate[toCreateKeys[c]].language
        delete this.toCreate[toCreateKeys[c]]

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
      this.apiIcService.updateDocument(this.id, this.toUpdate[toUpdateConfirm[u]]).subscribe((ic: Ic) => {
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

  }
}
