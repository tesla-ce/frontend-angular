import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbDialogService, NbIconModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { UpdateModule } from '../../../../crud/update/update.module';

import { InstitutionUserUpdateComponent } from './institution-user-update.component';

describe('InstitutionUserUpdateComponent', () => {
  let component: InstitutionUserUpdateComponent;
  let fixture: ComponentFixture<InstitutionUserUpdateComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  }

  class DialogMock {
    open() {
      return {
        onClose: of({})
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserUpdateComponent ],
      imports: [ RouterTestingModule,
        NbDialogModule.forRoot(),
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        NbToastrModule.forRoot(),
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbActionsModule,
        NbIconModule,
        UpdateModule,
        TranslateModule.forRoot(),
     ],
      providers: [ ThemeModule.forRoot().providers,
        { provide: AuthService, useClass: AuthServiceTesting },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 1,
            }),
          },
        },
        { provide: Location, useValue: locationStub },
        { provide: NbDialogService, useClass: DialogMock },
        { provide: NbToastrService, useClass: ToastrServiceTesting },

        EnvService ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });

  it('should update an item', async () => {
    const userResponse: any = apiServiceTesting.getData('/institution/1/user/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/1/'));
    getRequest.flush(userResponse);
    component.onSave({username: 'test'});
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/1/'));
    expect(updateRequest.request.method).toBe('PATCH');
    updateRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail on update an item', async () => {
    const userResponse: any = apiServiceTesting.getData('/institution/1/user/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/1/'));
    getRequest.flush(userResponse);
    component.onSave({username: 'test'});
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/1/'));
    expect(updateRequest.request.method).toBe('PATCH');
    updateRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    expect(component).toBeTruthy();
  });

  it('should call valueChanges method', async () => {
    component.valueChanges(true);
    expect(component.changePasswordDisabled).toBe(true);
  });

  it('should change password', async () => {
    const userResponse: any = apiServiceTesting.getData('/institution/1/user/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/1/'));
    getRequest.flush(userResponse);
    component.changePassword(); 
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/1/'));
    expect(updateRequest.request.method).toBe('PATCH');
    updateRequest.flush(userResponse);
    expect(component).toBeTruthy();
  });

  it('should fail to change password', async () => {
    const userResponse: any = apiServiceTesting.getData('/institution/1/user/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/1/'));
    getRequest.flush(userResponse);
    component.changePassword(); 
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/1/'));
    expect(updateRequest.request.method).toBe('PATCH');
    updateRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    expect(component).toBeTruthy();
  });
});
