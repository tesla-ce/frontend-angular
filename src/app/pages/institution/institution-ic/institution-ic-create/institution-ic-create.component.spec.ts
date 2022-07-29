import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutScrollService, NbSelectModule, NbTabsetModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CKEditorModule } from 'ng2-ckeditor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';

import { InstitutionIcCreateComponent } from './institution-ic-create.component';

describe('InstitutionIcCreateComponent', () => {
  let component: InstitutionIcCreateComponent;
  let fixture: ComponentFixture<InstitutionIcCreateComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIcCreateComponent ],
      imports: [ NbAuthModule.forRoot(),
        NbToastrModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
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
        NbDatepickerModule,
       ],
      providers: [
        ThemeModule.forRoot().providers,
        NbDatepickerModule.forRoot().providers,
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: NbToastrService, useClass: ToastrServiceTesting },
        { provide: Location, useValue: locationStub },
        EnvService,
        NbLayoutScrollService ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIcCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an item', async () => {
    component.onSave({username: 'test'});
    const createRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/'));
    expect(createRequest.request.method).toBe('POST');
    createRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail on create an item', async () => {
    component.onSave({username: 'test'});
    const createRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/'));
    expect(createRequest.request.method).toBe('POST');
    createRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    expect(component).toBeTruthy();
  });

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
