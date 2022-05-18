import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbTabsetModule, NbThemeModule, NbToastrModule, NbToastrService, NbWindowModule, NbWindowService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CKEditorModule } from 'ng2-ckeditor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { of } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { CKEditorComponent } from '../../../../@core/mock/ckeditor.component.mock';
import { ToastrServiceTesting } from '../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';

import { InstitutionIcUpdateComponent } from './institution-ic-update.component';

describe('InstitutionIcUpdateComponent', () => {
  let component: InstitutionIcUpdateComponent;
  let fixture: ComponentFixture<InstitutionIcUpdateComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIcUpdateComponent ],
      imports: [ 
        RouterTestingModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        NbWindowModule.forRoot(),
        TranslateModule.forRoot(),
        NbToastrModule.forRoot(),
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbActionsModule,
        NbFormFieldModule,
        RxReactiveFormsModule,
        NbIconModule,
        CreateModule,
        CKEditorModule,
        NbTabsetModule,
        PdfViewerModule,
        NbDatepickerModule.forRoot(),
       ],
      providers: [ { provide: AuthService, useClass: AuthServiceTesting },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 1,
            }),
          },
        },
        { provide: NbWindowService, useValue: { open:()=>true, close:()=>true }},
        { provide: Location, useValue: locationStub },
        { provide: NbToastrService, useClass: ToastrServiceTesting },
        NbThemeModule.forRoot().providers,
        EnvService ],
    })
    .overrideModule(CKEditorModule,{
      set: {
        declarations:[CKEditorComponent],
        exports: [CKEditorComponent]
      }
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIcUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const documentResponse: any = apiServiceTesting.getData('/institution/1/ic/1/document/');
    const getDocumentRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/'));
    getDocumentRequest.flush(documentResponse);
    const icResponse: any = apiServiceTesting.getData('/institution/1/ic/1/');
    const getIcRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/'));
    getIcRequest.flush(icResponse);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });

  it('should call change PDF method', async () => {
    component.hasDocument['en'] = {};
    component.changePDF('en');
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/en/'));
    expect(updateRequest.request.method).toBe('PATCH');
    expect(component).toBeTruthy();
  });

  it('should add new language method', async () => {
    const documentResponse: any = apiServiceTesting.getData('/institution/1/ic/1/document/');
    const getDocumentRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/'));
    getDocumentRequest.flush(documentResponse);
    const icResponse: any = apiServiceTesting.getData('/institution/1/ic/1/');
    const getIcRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/'));
    getIcRequest.flush(icResponse);
    fixture.detectChanges();
    component.selectedLanguage = 'fr';
    component.availableLanguages = ['en','fr'];
    component.addNewLanguage();
    expect(component).toBeTruthy();
  });

  it('should call language selected onChange', async () => {
    const documentResponse: any = apiServiceTesting.getData('/institution/1/ic/1/document/');
    const getDocumentRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/'));
    getDocumentRequest.flush(documentResponse);
    const icResponse: any = apiServiceTesting.getData('/institution/1/ic/1/');
    const getIcRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/'));
    getIcRequest.flush(icResponse);
    fixture.detectChanges();
    component.selectedLanguage = 'fr';
    component.availableLanguages = ['en','fr'];
    component.languageSelectedChange('fr');
    expect(component).toBeTruthy();
  });

  it('should call delete not persisted language', async () => {
    component.selectedLanguage = 'fr';
    component.availableLanguages = ['en','fr'];
    component.toCreate = {fr:{}};
    component.deleteLanguage('fr',0);
    expect(component).toBeTruthy();
  });

  it('should call prepare persisted language to delete', async () => {
    component.selectedLanguage = 'fr';
    component.availableLanguages = ['en','fr'];
    component.toCreate = {};
    component.deleteLanguage('fr',0);
    expect(component).toBeTruthy();
  });

  it('should call delete persisted language', async () => {
    component.selectedLanguage = 'fr';
    component.availableLanguages = ['en','fr'];
    component.toDelete = 'fr';
    component.windowRef =  { close:()=>true };
    const documentResponse: any = apiServiceTesting.getData('/institution/1/ic/1/document/');
    const getDocumentRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/'));
    getDocumentRequest.flush(documentResponse);
    const icResponse: any = apiServiceTesting.getData('/institution/1/ic/1/');
    const getIcRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/'));
    getIcRequest.flush(icResponse);
    fixture.detectChanges();
    component.delete();
    const deleteDocumentRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/fr/'));
    deleteDocumentRequest.flush(true);
    // expect(getDocumentRequest.request.method).toBe('DELETE');
    expect(component).toBeTruthy();
  });

  it('should update an item', async () => {
    const documentResponse: any = apiServiceTesting.getData('/institution/1/ic/1/document/');
    const getDocumentRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/'));
    getDocumentRequest.flush(documentResponse);
    const icResponse: any = apiServiceTesting.getData('/institution/1/ic/1/');
    const getIcRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/'));
    getIcRequest.flush(icResponse);
    fixture.detectChanges();
    component.selectedLanguage = 'fr';
    component.availableLanguages = ['en','fr'];
    component.hasDocument = {fr: {has:false, title: 'test-fr'}};
    component.toCreate = {en: { language: 'en',form: { html: '<div>test</div>'}}};
    component.toUpdate = {fr: { language: 'fr',form: { html: '<div>test</div>'}}};
    component.instance.version = '1.2.3';
    component.update();

    const createRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/'));
    expect(createRequest.request.method).toBe('POST');
    createRequest.flush(true);
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/fr/'));
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush(true);
    const updateIcRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/'));
    expect(updateIcRequest.request.method).toBe('PUT');
    updateIcRequest.flush(icResponse);
    expect(component).toBeTruthy();
  });

  it('should fail on update an item', async () => {
    const documentResponse: any = apiServiceTesting.getData('/institution/1/ic/1/document/');
    const getDocumentRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/'));
    getDocumentRequest.flush(documentResponse);
    const icResponse: any = apiServiceTesting.getData('/institution/1/ic/1/');
    const getIcRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/'));
    getIcRequest.flush(icResponse);
    fixture.detectChanges();
    component.selectedLanguage = 'fr';
    component.availableLanguages = ['en','fr'];
    component.hasDocument = {fr: {has:false, title: 'test-fr'}};
    component.toCreate = {en: { language: 'en',form: { html: '<div>test</div>'}}};
    component.toUpdate = {fr: { language: 'fr',form: { html: '<div>test</div>'}}};
    component.instance.version = '1.2.3';
    component.update();

    const createRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/'));
    expect(createRequest.request.method).toBe('POST');
    createRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/fr/'));
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    const updateIcRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/'));
    expect(updateIcRequest.request.method).toBe('PUT');
    updateIcRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    expect(component).toBeTruthy();
  });

});
