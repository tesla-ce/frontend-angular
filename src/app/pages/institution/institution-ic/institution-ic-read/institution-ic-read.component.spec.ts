import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbActionsModule, NbIconModule, NbDatepickerModule, NbTabsetModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { of } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { ListModule } from '../../../../crud/list/list.module';

import { InstitutionIcReadComponent } from './institution-ic-read.component';

describe('InstitutionIcReadComponent', () => {
  let component: InstitutionIcReadComponent;
  let fixture: ComponentFixture<InstitutionIcReadComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIcReadComponent ],
      imports: [ 
        RouterTestingModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbActionsModule,
        NbIconModule,
        ListModule,
        CreateModule,
        PdfViewerModule,
        NbDatepickerModule,
        NbTabsetModule,
      ],
      providers: [ 
        ThemeModule.forRoot().providers,
        { provide: Location, useValue: locationStub},
        { provide: AuthService, useClass: AuthServiceTesting },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 1,
            }),
          },
        },
        EnvService ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIcReadComponent);
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
});
