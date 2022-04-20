import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbDialogRef } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { UpdateModule } from '../../../../crud/update/update.module';
import { AdminInstrumentProviderEditComponent } from './admin-instrument-provider-edit.component';

class DialogMock {
  close() {
    return true;
  }
}

describe('AdminInstrumentProviderEditComponent', () => {
  let component: AdminInstrumentProviderEditComponent;
  let fixture: ComponentFixture<AdminInstrumentProviderEditComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstrumentProviderEditComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NbCardModule,
        TranslateModule.forRoot(),
        UpdateModule,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: NbDialogRef, useClass: DialogMock },
        EnvService,
        ThemeModule.forRoot().providers,
      ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstrumentProviderEditComponent);
    component = fixture.componentInstance;
    component.userId = 1;
    component.instrumentId = 1;
    component.providerId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close', () => {
    component.dismiss();
    expect(component).toBeTruthy();
  });

  it('should call save', () => {
    const providerResponse: any = apiServiceTesting.getData('/admin/instrument/1/provider/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/provider/1/'));
    getRequest.flush(providerResponse);
    fixture.detectChanges();
    component.onSave(providerResponse);
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/provider/1/'));
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush(providerResponse);
    expect(component).toBeTruthy();
  });

  it('should fail on call save', () => {
    component.onSave({ options_schema: 'json}malformed{test'});
    expect(component).toBeTruthy();
  });
});
