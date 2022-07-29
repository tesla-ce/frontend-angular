import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbFormFieldModule, NbIconModule, NbActionsModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ReadModule } from '../../../../crud/read/read.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminUserReadComponent } from './admin-user-read.component';

describe('AdminUserReadComponent', () => {
  let component: AdminUserReadComponent;
  let fixture: ComponentFixture<AdminUserReadComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserReadComponent ],
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
        ReadModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
          EnvService,
          { provide: Location, useValue: locationStub},
          { provide: AuthService, useClass: AuthServiceTesting },
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({
                id: 1,
              }),
            },
          },
        ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const userResponse: any = apiServiceTesting.getData('/admin/user/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user/1/'));
    getRequest.flush(userResponse);
    expect(component).toBeTruthy();
  });

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
