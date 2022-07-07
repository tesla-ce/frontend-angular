import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbDialogService, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ListModule } from '../../../../crud/list/list.module';
import { UpdateModule } from '../../../../crud/update/update.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminInstrumentUpdateComponent } from './admin-instrument-update.component';

describe('AdminInstrumentUpdateComponent', () => {
  let component: AdminInstrumentUpdateComponent;
  let fixture: ComponentFixture<AdminInstrumentUpdateComponent>;
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
      declarations: [ AdminInstrumentUpdateComponent ],
      imports: [ 
            RouterTestingModule,
            NbDialogModule.forRoot(),
            NbAuthModule.forRoot(),
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
            NbCheckboxModule,
            NbIconModule,
            NbActionsModule,
            UpdateModule,
            ListModule,
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
    fixture = TestBed.createComponent(AdminInstrumentUpdateComponent);
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
    const instrumentResponse: any = apiServiceTesting.getData('/admin/instrument/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/'));
    getRequest.flush(instrumentResponse);
    component.onSave({name: 'test'});
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/'));
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail on update an item', async () => {
    const instrumentResponse: any = apiServiceTesting.getData('/admin/instrument/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/'));
    getRequest.flush(instrumentResponse);
    component.onSave({name: 'test'});
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/'));
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    expect(component).toBeTruthy();
  });



  it('should call addNew method', async () => {
    const instrumentResponse: any = apiServiceTesting.getData('/admin/instrument/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/'));
    getRequest.flush(instrumentResponse);
    fixture.detectChanges();
    component.addNew();
    expect(component).toBeTruthy();
  });

  it('should call edit method', async () => {
    const instrumentResponse: any = apiServiceTesting.getData('/admin/instrument/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/'));
    getRequest.flush(instrumentResponse);
    fixture.detectChanges();
    component.edit({id: 1});
    expect(component).toBeTruthy();
  });

  it('should call remove method', async () => {
    const instrumentResponse: any = apiServiceTesting.getData('/admin/instrument/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/'));
    getRequest.flush(instrumentResponse);
    fixture.detectChanges();
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/provider/1/'));
    deleteRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail call remove method', async () => {
    const instrumentResponse: any = apiServiceTesting.getData('/admin/instrument/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/'));
    getRequest.flush(instrumentResponse);
    fixture.detectChanges();
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/provider/1/'));
    deleteRequest.flush("error", {status: 500, statusText: 'Internal Server Error'});
    expect(component).toBeTruthy();
  });
});
