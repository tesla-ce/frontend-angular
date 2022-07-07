import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogService, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { of } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { UpdateModule } from '../../../../crud/update/update.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminInstitutionUpdateComponent } from './admin-institution-update.component';

describe('AdminInstitutionUpdateComponent', () => {
  let component: AdminInstitutionUpdateComponent;
  let fixture: ComponentFixture<AdminInstitutionUpdateComponent>;
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
      declarations: [ AdminInstitutionUpdateComponent ],
      imports: [
            RouterTestingModule,
            HttpClientTestingModule,
            NbToastrModule.forRoot(),
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
          { provide: Location, useValue: locationStub },
          { provide: NbDialogService, useClass: DialogMock },
          { provide: NbToastrService, useClass: ToastrServiceTesting },
          EnvService,
      ]

    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstitutionUpdateComponent);
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
    const institutionResponse: any = apiServiceTesting.getData('/institution/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/'));
    getRequest.flush(institutionResponse);
    component.onSave({name: 'test'});
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/institution/1/'));
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail on update an item', async () => {
    const institutionResponse: any = apiServiceTesting.getData('/institution/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/'));
    getRequest.flush(institutionResponse);
    component.onSave({name: 'test'});
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/institution/1/'));
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    expect(component).toBeTruthy();
  });
});
