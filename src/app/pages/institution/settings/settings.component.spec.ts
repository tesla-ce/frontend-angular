import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../@theme/theme.module';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      imports: [ NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        NbToastrModule.forRoot(),
        TranslateModule.forRoot(),
        ThemeModule,
        NbButtonModule,
        NbInputModule,
        NbCardModule,
        NbCheckboxModule,
      ],
      providers: [ 
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: NbToastrService, useClass: ToastrServiceTesting },
        EnvService,
        ThemeModule.forRoot().providers ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle all checkboxes', () => {
    const institutionResponse: any = apiServiceTesting.getData('/institution/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/'));
    getRequest.flush(institutionResponse);
    component.toggleDisableVLELearnerCreation(true);
    component.toggleDisableVLEInstructorCreation(true);
    component.toggleDisableVLEUserCreation(true);
    component.toggleAllowLearnerReport(true);
    component.toggleAllowLearnerAudit(true);
    component.toggleAllowValidAudit(true);
    component.toggleExternalIC(true);
    expect(component.institution.disable_vle_learner_creation).toBe(true);
    expect(component.institution.disable_vle_instructor_creation).toBe(true);
    expect(component.institution.disable_vle_user_creation).toBe(true);
    expect(component.institution.allow_learner_report).toBe(true);
    expect(component.institution.allow_learner_audit).toBe(true);
    expect(component.institution.allow_valid_audit).toBe(true);
    expect(component.institution.external_ic).toBe(true);
  });

  it('should save changes', () => {
    const institutionResponse: any = apiServiceTesting.getData('/institution/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/'));
    getRequest.flush(institutionResponse);
    component.onSave();
    const updateResponse: any = apiServiceTesting.getData('/institution/1/');
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/'));
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush(updateResponse);
    expect(component).toBeTruthy();
  });

  it('should fail on save changes', async () => {
    const institutionResponse: any = apiServiceTesting.getData('/institution/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/'));
    getRequest.flush(institutionResponse);
    component.onSave();
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/'));
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush("error", {status: 404, statusText: 'Not Found'});
    expect(component).toBeTruthy();
  });
});
