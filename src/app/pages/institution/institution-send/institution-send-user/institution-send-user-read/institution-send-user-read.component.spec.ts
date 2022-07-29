import { DatePipe, Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { of } from 'rxjs';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { ListModule } from '../../../../../crud/list/list.module';
import { ReadModule } from '../../../../../crud/read/read.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';

import { InstitutionSendUserReadComponent } from './institution-send-user-read.component';

describe('InstitutionSendUserReadComponent', () => {
  let component: InstitutionSendUserReadComponent;
  let fixture: ComponentFixture<InstitutionSendUserReadComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendUserReadComponent ],
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
        ReadModule,
        Ng2SmartTableModule,
    ],
      providers: [ ThemeModule.forRoot().providers,
        EnvService,
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
        DatePipe ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendUserReadComponent);
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

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
