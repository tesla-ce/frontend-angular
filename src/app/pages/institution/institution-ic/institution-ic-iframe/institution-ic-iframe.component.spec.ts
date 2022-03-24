import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';
import 'rxjs/add/observable/of';

import { InstitutionIcIframeComponent } from './institution-ic-iframe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbSelectModule, NbActionsModule, NbIconModule } from '@nebular/theme';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ThemeModule } from '../../../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';

describe('InstitutionIcIframeComponent', () => {
  let component: InstitutionIcIframeComponent;
  let fixture: ComponentFixture<InstitutionIcIframeComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIcIframeComponent ],
      imports: [ NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        NbCardModule,
        NbButtonModule,
        NbSelectModule,
        NbActionsModule,
        NbIconModule,
        PdfViewerModule,
        TranslateModule.forRoot(),
      ],
      providers: [ 
          ThemeModule.forRoot().providers,
          { provide: AuthService, useClass: AuthServiceTesting },
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({
                id: 1,
              }),
            },
          },
          EnvService,
     ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIcIframeComponent);
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
    expect(component).toBeTruthy();
  });

  it('it sould select a language', () => {
    const documentResponse: any = apiServiceTesting.getData('/institution/1/ic/1/document/');
    const getDocumentRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/'));
    getDocumentRequest.flush(documentResponse);
    component.pickedLanguage('fr');
    expect(component).toBeTruthy();
  });
});
