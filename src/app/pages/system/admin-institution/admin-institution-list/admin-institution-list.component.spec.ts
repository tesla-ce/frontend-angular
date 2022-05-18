import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminInstitutionListComponent } from './admin-institution-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvService } from '../../../../@core/env/env.service';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListModule } from '../../../../crud/list/list.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { ToastrServiceTesting } from '../../../../@core/mock/toastr.service.mock';

describe('AdminInstitutionListComponent', () => {
  let component: AdminInstitutionListComponent;
  let fixture: ComponentFixture<AdminInstitutionListComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        NbIconModule,
        NbActionsModule,
        NbDialogModule.forRoot(),
        ListModule,
      ],
      declarations: [ AdminInstitutionListComponent ],
      providers: [
        ThemeModule.forRoot().providers,
        { provide: AuthService, useClass: AuthServiceTesting },
          NbToastrModule.forRoot().providers,
          { provide: NbToastrService, useClass: ToastrServiceTesting },
          EnvService,
      ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstitutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list of mocked institutions', async () => {
    const institutionsResponse: any = apiServiceTesting.getData('/admin/institution?offset=0&limit=10');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/institution?offset=0&limit=10'));
    getRequest.flush(institutionsResponse);
    await component.list.source.getAll().then(data=>{
      fixture.detectChanges();
      expect(data).toEqual(institutionsResponse.results);
    });
  });

  it('should delete an item', async () => {
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/institution/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail on delete an item', async () => {
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/institution/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush("error", {status: 404, statusText: 'Not Found'});
    expect(component).toBeTruthy();
  });
});
