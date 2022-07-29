import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ListModule } from '../../../../crud/list/list.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminInstrumentListComponent } from './admin-instrument-list.component';

describe('AdminInstrumentListComponent', () => {
  let component: AdminInstrumentListComponent;
  let fixture: ComponentFixture<AdminInstrumentListComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstrumentListComponent ],
      imports: [
          NbAuthModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule,
          NbToastrModule.forRoot(),
          TranslateModule.forRoot(),
          ThemeModule,
          SideMenuModule,
          NbCardModule,
          NbButtonModule,
          NbIconModule,
          NbActionsModule,
          ListModule,
      ],
      providers: [
          ThemeModule.forRoot().providers,
          { provide: AuthService, useClass: AuthServiceTesting },
          NbToastrModule.forRoot().providers,
          { provide: NbToastrService, useClass: ToastrServiceTesting },
          EnvService,
      ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstrumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list of mocked instruments', async () => {
    const instrumentsResponse: any = apiServiceTesting.getData('/admin/instrument?offset=0&limit=10');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument?offset=0&limit=10'));
    getRequest.flush(instrumentsResponse);
    await component.list.source.getAll().then(data=>{
      fixture.detectChanges();
      expect(data).toEqual(instrumentsResponse.results);
    });
  });

  it('should delete an item', async () => {
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail on delete an item', async () => {
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/instrument/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush("error", {status: 404, statusText: 'Not Found'});
    expect(component).toBeTruthy();
  });
});
