import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbFormFieldModule, NbIconModule, NbActionsModule, NbDialogModule, NbToastrModule, NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { UpdateModule } from '../../../../crud/update/update.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminUserUpdateComponent } from './admin-user-update.component';

describe('AdminUserUpdateComponent', () => {
  let component: AdminUserUpdateComponent;
  let fixture: ComponentFixture<AdminUserUpdateComponent>;
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
      declarations: [ AdminUserUpdateComponent ],
      imports: [
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbFormFieldModule,
        NbIconModule,
        NbActionsModule,
        UpdateModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        NbDialogModule.forRoot(),
        NbToastrModule.forRoot(),
      ],
      providers: [
          ThemeModule.forRoot().providers,
          EnvService,
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
      ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserUpdateComponent);
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
    const userResponse: any = apiServiceTesting.getData('/admin/user/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user/1/'));
    getRequest.flush(userResponse);
    component.onSave({username: 'test'});
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user/1/'));
    expect(updateRequest.request.method).toBe('PATCH');
    updateRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail on update an item', async () => {
    const userResponse: any = apiServiceTesting.getData('/admin/user/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user/1/'));
    getRequest.flush(userResponse);
    component.onSave({username: 'test'});
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user/1/'));
    expect(updateRequest.request.method).toBe('PATCH');
    updateRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    expect(component).toBeTruthy();
  });

  it('should call valueChanges method', async () => {
    component.valueChanges(true);
    expect(component.changePasswordDisabled).toBe(true);
  });

  it('should change password', async () => {
    const userResponse: any = apiServiceTesting.getData('/admin/user/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user/1/'));
    getRequest.flush(userResponse);
    component.changePassword(); 
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user/1/'));
    expect(updateRequest.request.method).toBe('PATCH');
    updateRequest.flush(userResponse);
    expect(component).toBeTruthy();
  });

  it('should fail to change password', async () => {
    const userResponse: any = apiServiceTesting.getData('/admin/user/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user/1/'));
    getRequest.flush(userResponse);
    component.changePassword(); 
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user/1/'));
    expect(updateRequest.request.method).toBe('PATCH');
    updateRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    expect(component).toBeTruthy();
  });
});
