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
import { CreateModule } from '../../../../crud/create/create.module';
import { AdminInstrumentProviderAddComponent } from './admin-instrument-provider-add.component';

class DialogMock {
  close() {
    return true;
  }
}

describe('AdminInstrumentProviderAddComponent', () => {
  let component: AdminInstrumentProviderAddComponent;
  let fixture: ComponentFixture<AdminInstrumentProviderAddComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstrumentProviderAddComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NbCardModule,
        CreateModule,
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
    fixture = TestBed.createComponent(AdminInstrumentProviderAddComponent);
    component = fixture.componentInstance;
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
    component.instrumentId = 1;
    const providerResponse: any = apiServiceTesting.getData('/admin/instrument/1/provider/');
    component.onSave(providerResponse);
    const createRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/provider/'));
    expect(createRequest.request.method).toBe('POST');
    createRequest.flush(providerResponse);
    expect(component).toBeTruthy();
  });
});
