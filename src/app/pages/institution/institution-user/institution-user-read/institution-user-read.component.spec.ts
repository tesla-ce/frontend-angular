import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbActionsModule, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ReadModule } from '../../../../crud/read/read.module';

import { InstitutionUserReadComponent } from './institution-user-read.component';

describe('InstitutionUserReadComponent', () => {
  let component: InstitutionUserReadComponent;
  let fixture: ComponentFixture<InstitutionUserReadComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserReadComponent ],
      imports: [ RouterTestingModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbActionsModule,
        NbIconModule,
        ReadModule,
        TranslateModule.forRoot(),
      ],
      providers: [ EnvService,
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
       ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const userResponse: any = apiServiceTesting.getData('/institution/1/user/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/user/1/'));
    getRequest.flush(userResponse);
    expect(component).toBeTruthy();
  });

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
