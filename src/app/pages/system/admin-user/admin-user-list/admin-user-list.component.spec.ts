import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbFormFieldModule, NbIconModule, NbActionsModule, NbToastrModule, NbToastrService, NbDialogModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { EnvService } from '../../../../@core/env/env.service';
import { ToastrServiceTesting } from '../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ListModule } from '../../../../crud/list/list.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';

import { AdminUserListComponent } from './admin-user-list.component';

describe('AdminUserListComponent', () => {
  let component: AdminUserListComponent;
  let fixture: ComponentFixture<AdminUserListComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserListComponent ],
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
        ListModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        NbToastrModule.forRoot(),
        RouterTestingModule,
        NbDialogModule.forRoot(),
      ],
      providers: [
          EnvService,
          NbToastrModule.forRoot().providers,
          { provide: NbToastrService, useClass: ToastrServiceTesting },
          ThemeModule.forRoot().providers,
      ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list of mocked users', async () => {
    const usersResponse: any = apiServiceTesting.getData('/admin/user?offset=0&limit=10');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user?offset=0&limit=10'));
    getRequest.flush(usersResponse);
    await component.list.source.getAll().then(data=>{
      fixture.detectChanges();
      expect(data).toEqual(usersResponse.results);
    });
  });

  it('should delete an item', async () => {
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail on delete an item', async () => {
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush("error", {status: 404, statusText: 'Not Found'});
    expect(component).toBeTruthy();
  });
});
