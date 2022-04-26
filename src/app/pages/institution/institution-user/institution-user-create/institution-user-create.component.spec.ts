import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbThemeModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';

import { InstitutionUserCreateComponent } from './institution-user-create.component';

describe('InstitutionUserCreateComponent', () => {
  let component: InstitutionUserCreateComponent;
  let fixture: ComponentFixture<InstitutionUserCreateComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserCreateComponent ],
      imports: [ HttpClientTestingModule,
        NbAuthModule.forRoot(),
        RouterTestingModule,
        NbToastrModule.forRoot(),
        TranslateModule.forRoot(),
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbActionsModule,
        NbIconModule,
        CreateModule,
      ],
      providers: [ NbThemeModule.forRoot().providers,
        EnvService,
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: NbToastrService, useClass: ToastrServiceTesting },
        {provide: Location, useValue: locationStub}
       ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an item', async () => {
    component.onSave({username: 'test'});
    const createRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/'));
    expect(createRequest.request.method).toBe('POST');
    createRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail on create an item', async () => {
    component.onSave({username: 'test'});
    const createRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/'));
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
