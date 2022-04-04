import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbThemeModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../../@core/mock/api.service.mock';
import { ToastrServiceTesting } from '../../../../../@core/mock/toastr.service.mock';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { ListModule } from '../../../../../crud/list/list.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';

import { InstitutionSendCategoryListComponent } from './institution-send-category-list.component';

describe('InstitutionSendCategoryListComponent', () => {
  let component: InstitutionSendCategoryListComponent;
  let fixture: ComponentFixture<InstitutionSendCategoryListComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendCategoryListComponent ],
      imports: [ NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        NbToastrModule.forRoot(),
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbActionsModule,
        NbFormFieldModule,
        NbIconModule,
        ListModule,
      ],
      providers: [ 
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: NbToastrService, useClass: ToastrServiceTesting },
        NbThemeModule.forRoot().providers,
        EnvService ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const getResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getRequest.flush(getResponse);
    expect(component).toBeTruthy();
  });

  it('should delete an item', async () => {
    const getResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getRequest.flush(getResponse);
    fixture.detectChanges();
    const getListResponse: any = apiServiceTesting.getData('/institution/1/send?offset=0&limit=10');
    const getListRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/send?offset=0&limit=10'));
    getListRequest.flush(getListResponse);
    fixture.detectChanges();
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/send/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush(true);
    expect(component).toBeTruthy();
  });


  it('should fail on delete an item', async () => {
    const getResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getRequest.flush(getResponse);
    fixture.detectChanges();
    const getListResponse: any = apiServiceTesting.getData('/institution/1/send?offset=0&limit=10');
    const getListRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/send?offset=0&limit=10'));
    getListRequest.flush(getListResponse);
    fixture.detectChanges();
    component.remove({id: 1});
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/send/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush("error", {status: 404, statusText: 'Not Found'});
    expect(component).toBeTruthy();
  });
});
