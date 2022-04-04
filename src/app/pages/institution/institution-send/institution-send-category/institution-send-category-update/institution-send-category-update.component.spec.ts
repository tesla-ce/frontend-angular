import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbThemeModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { UpdateModule } from '../../../../../crud/update/update.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';

import { InstitutionSendCategoryUpdateComponent } from './institution-send-category-update.component';

describe('InstitutionSendCategoryUpdateComponent', () => {
  let component: InstitutionSendCategoryUpdateComponent;
  let fixture: ComponentFixture<InstitutionSendCategoryUpdateComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendCategoryUpdateComponent ],
      imports: [ RouterTestingModule,
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
        NbToastrModule.forRoot(),
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
        UpdateModule,
        TranslateModule.forRoot(),
      ],
      providers: [ EnvService,
        NbThemeModule.forRoot().providers,
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: Location, useValue: locationStub },  
        { provide: NbToastrService, useClass: ToastrServiceTesting },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 1,
            }),
          },
        },
       ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendCategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const getInstrumentsResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getInstrumentsRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getInstrumentsRequest.flush(getInstrumentsResponse);
    const getSendCategoryResponse: any = apiServiceTesting.getData('/institution/1/send/1/');
    const getSendCategoryRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/send/1/'));
    getSendCategoryRequest.flush(getSendCategoryResponse);
    expect(component).toBeTruthy();
  });

  it('should update an item', async () => {
    const getInstrumentsResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getInstrumentsRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getInstrumentsRequest.flush(getInstrumentsResponse);
    const getSendCategoryResponse: any = apiServiceTesting.getData('/institution/1/send/1/');
    const getSendCategoryRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/send/1/'));
    getSendCategoryRequest.flush(getSendCategoryResponse);
    component.onSave({enabled_instruments: []});
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/send/1/'));
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail on update an item', async () => {
    const getInstrumentsResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getInstrumentsRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getInstrumentsRequest.flush(getInstrumentsResponse);
    const getSendCategoryResponse: any = apiServiceTesting.getData('/institution/1/send/1/');
    const getSendCategoryRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/send/1/'));
    getSendCategoryRequest.flush(getSendCategoryResponse);
    component.onSave({enabled_instruments: []});
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/send/1/'));
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    expect(component).toBeTruthy();
  });

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
