import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbActionsModule, NbFormFieldModule, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { CreateModule } from '../../../../../crud/create/create.module';
import { ListModule } from '../../../../../crud/list/list.module';
import { ReadModule } from '../../../../../crud/read/read.module';
import { UpdateModule } from '../../../../../crud/update/update.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';

import { InstitutionSendCategoryReadComponent } from './institution-send-category-read.component';

describe('InstitutionSendCategoryReadComponent', () => {
  let component: InstitutionSendCategoryReadComponent;
  let fixture: ComponentFixture<InstitutionSendCategoryReadComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendCategoryReadComponent ],
      imports: [ 
        RouterTestingModule,
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
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
        ListModule,
        CreateModule,
        ReadModule,
        UpdateModule,
        TranslateModule.forRoot(),
      ],
      providers: [ 
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
      ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendCategoryReadComponent);
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

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
