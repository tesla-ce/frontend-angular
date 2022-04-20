import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminInstrumentCreateComponent } from './admin-instrument-create.component';

describe('AdminInstrumentCreateComponent', () => {
  let component: AdminInstrumentCreateComponent;
  let fixture: ComponentFixture<AdminInstrumentCreateComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstrumentCreateComponent ],
      imports: [
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        NbToastrModule.forRoot(),
        TranslateModule.forRoot(),
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbFormFieldModule,
        NbCheckboxModule,
        NbIconModule,
        NbActionsModule,
        CreateModule,
      ],
      providers: [
          ThemeModule.forRoot().providers,
          { provide: AuthService, useClass: AuthServiceTesting },
          EnvService,
          { provide: AuthService, useClass: AuthServiceTesting },
          { provide: NbToastrService, useClass: ToastrServiceTesting },
          { provide: Location, useValue: locationStub}
      ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstrumentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an item', async () => {
    component.onSave({options_schema: '{}'});
    const createRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/'));
    expect(createRequest.request.method).toBe('POST');
    createRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail on create an item', async () => {
    component.onSave({options_schema: '{}'});
    const createRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/'));
    expect(createRequest.request.method).toBe('POST');
    createRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    expect(component).toBeTruthy();
  });

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
