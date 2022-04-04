import { DatePipe, Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { of } from 'rxjs';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { ListModule } from '../../../../../crud/list/list.module';
import { UpdateModule } from '../../../../../crud/update/update.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';

import { InstitutionSendUserUpdateComponent } from './institution-send-user-update.component';

describe('InstitutionSendUserUpdateComponent', () => {
  let component: InstitutionSendUserUpdateComponent;
  let fixture: ComponentFixture<InstitutionSendUserUpdateComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendUserUpdateComponent ],
      imports: [ RouterTestingModule,
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
        TranslateModule.forRoot(),
        NbDialogModule.forRoot(),
        NbToastrModule.forRoot(),
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbIconModule,
        NbActionsModule,
        NbFormFieldModule,
        NbDatepickerModule,
        NbIconModule,
        ListModule,
        UpdateModule,
        Ng2SmartTableModule,
    ],
      providers: [ EnvService,
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: Location, useValue: locationStub },  
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 1,
            }),
          },
        },
        { provide: NbToastrService, useClass: ToastrServiceTesting },
        DatePipe,
        ThemeModule.forRoot().providers ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const getLearnerResponse: any = apiServiceTesting.getData('/institution/1/learner/1/');
    const getLearnerRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/'));
    getLearnerRequest.flush(getLearnerResponse);
    const getSendUserCategoriesResponse: any = apiServiceTesting.getData('/institution/1/learner/1/send/');
    const getSendUserCategoriesRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/send/'));
    getSendUserCategoriesRequest.flush(getSendUserCategoriesResponse);
    const getInstrumentsResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getInstrumentsRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getInstrumentsRequest.flush(getInstrumentsResponse);
    expect(component).toBeTruthy();
  });

  it('should delete an item', async () => {
    const getLearnerResponse: any = apiServiceTesting.getData('/institution/1/learner/1/');
    const getLearnerRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/'));
    getLearnerRequest.flush(getLearnerResponse);
    const getSendUserCategoriesResponse: any = apiServiceTesting.getData('/institution/1/learner/1/send/');
    const getSendUserCategoriesRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/send/'));
    getSendUserCategoriesRequest.flush(getSendUserCategoriesResponse);
    const getInstrumentsResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getInstrumentsRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getInstrumentsRequest.flush(getInstrumentsResponse);
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/send/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush(true);
    expect(component).toBeTruthy();
  });


  it('should fail on delete an item', async () => {
    const getLearnerResponse: any = apiServiceTesting.getData('/institution/1/learner/1/');
    const getLearnerRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/'));
    getLearnerRequest.flush(getLearnerResponse);
    const getSendUserCategoriesResponse: any = apiServiceTesting.getData('/institution/1/learner/1/send/');
    const getSendUserCategoriesRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/send/'));
    getSendUserCategoriesRequest.flush(getSendUserCategoriesResponse);
    const getInstrumentsResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getInstrumentsRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getInstrumentsRequest.flush(getInstrumentsResponse);
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/send/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush("error", {status: 404, statusText: 'Not Found'});
    expect(component).toBeTruthy();
  });

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });
});