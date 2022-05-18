import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbFormFieldModule, NbIconModule, NbTabsetModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthService } from '../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../@theme/theme.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { LearnerIcComponent } from './learner-ic.component';

describe('LearnerIcComponent', () => {
  let component: LearnerIcComponent;
  let fixture: ComponentFixture<LearnerIcComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerIcComponent ],
      imports: [ 
        RouterTestingModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbFormFieldModule,
        NbIconModule,
        CKEditorModule,
        SideMenuModule,
        NbTabsetModule,
        PdfViewerModule,
      ],
      providers: [ 
        ThemeModule.forRoot().providers,
        { provide: AuthService, useClass: AuthServiceTesting }
        , EnvService 
      ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerIcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const learnerResponse: any = apiServiceTesting.getData('/institution/1/learner/1/');
    const getLearnerRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/'));
    getLearnerRequest.flush(learnerResponse);
    const currentICResponse: any = apiServiceTesting.getData('/institution/1/ic/current/');
    const getCurrentICRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/current/'));
    getCurrentICRequest.flush(currentICResponse);
    const documentICResponse: any = apiServiceTesting.getData('/institution/1/ic/1/document/');
    const getDocumentICRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/ic/1/document/'));
    getDocumentICRequest.flush(documentICResponse);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call accept method', () => {
    component.accept();
    const acceptICResponse: any = apiServiceTesting.getData('/institution/1/learner/1/ic/');
    const getAcceptICRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/ic/'));
    getAcceptICRequest.flush(acceptICResponse);
    expect(component).toBeTruthy();
  });

  it('should call reject method', () => {
    component.reject();
    const acceptICResponse: any = apiServiceTesting.getData('/institution/1/learner/1/ic/');
    const getAcceptICRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/learner/1/ic/'));
    getAcceptICRequest.flush(acceptICResponse);
    expect(component).toBeTruthy();
  });

  it('should call pickedLanguage method', () => {
    component.pickedLanguage('en');
    expect(component).toBeTruthy();
  });
});
