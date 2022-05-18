import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbOverlayModule, NbSelectModule, NbThemeModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { CreateModule } from '../../../../../crud/create/create.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';
import { ApiServiceTesting } from '../../../../../@core/mock/api.service.mock';

import { InstitutionSendCategoryCreateComponent } from './institution-send-category-create.component';
import { Location } from '@angular/common';
import { ToastrServiceTesting } from '../../../../../@core/mock/toastr.service.mock';

describe('InstitutionSendCategoryCreateComponent', () => {
  let component: InstitutionSendCategoryCreateComponent;
  let fixture: ComponentFixture<InstitutionSendCategoryCreateComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendCategoryCreateComponent ],
      imports: [ NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        NbToastrModule.forRoot(),
        NbOverlayModule.forRoot(),
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbActionsModule,
        NbFormFieldModule,
        NbIconModule,
        CreateModule,
     ],
      providers: [ 
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: NbToastrService, useClass: ToastrServiceTesting },
        { provide: Location, useValue: locationStub },
        NbThemeModule.forRoot().providers,
        EnvService ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const getResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getRequest.flush(getResponse);
    expect(component).toBeTruthy();
  });

  it('should create an item', async () => {
    component.onSave({
      description: 'test-description',
      enabled_options: [1],
      disabled_instruments: [2], 
    });
    const createResponse: any = apiServiceTesting.getData('/institution/1/send/');
    const createRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/send/'));
    expect(createRequest.request.method).toBe('POST');
    createRequest.flush(createResponse);
    expect(component).toBeTruthy();
  });

  it('should fail on create an item', async () => {
    component.onSave({
      description: 'test-description',
      enabled_options: [1],
      disabled_instruments: [2], 
    });
    const createRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/send/'));
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
