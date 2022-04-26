import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ListModule } from '../../../../crud/list/list.module';

import { InstitutionUserListComponent } from './institution-user-list.component';

describe('InstitutionUserListComponent', () => {
  let component: InstitutionUserListComponent;
  let fixture: ComponentFixture<InstitutionUserListComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserListComponent ],
      imports: [ NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        NbToastrModule.forRoot(),
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        ListModule,
        NbDialogModule.forRoot(),
      ],
      providers: [ 
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: NbToastrService, useClass: ToastrServiceTesting },
        EnvService,
        ThemeModule.forRoot().providers ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list of mocked users', async () => {
    const usersResponse: any = apiServiceTesting.getData('/institution/1/user?offset=0&limit=10');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user?offset=0&limit=10'));
    getRequest.flush(usersResponse);
    await component.list.source.getAll().then(data=>{
      fixture.detectChanges();
      expect(data).toEqual(usersResponse.results);
    });
  });


  it('should delete an item', async () => {
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should fail on delete an item', async () => {
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush("error", {status: 404, statusText: 'Not Found'});
    expect(component).toBeTruthy();
  });
});
