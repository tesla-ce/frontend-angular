import { DatePipe } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbIconModule, NbActionsModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ListModule } from '../../../../crud/list/list.module';

import { CourseActivityListComponent } from './course-activity-list.component';

describe('CourseActivityListComponent', () => {
  let component: CourseActivityListComponent;
  let fixture: ComponentFixture<CourseActivityListComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseActivityListComponent],
      imports: [ 
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        ListModule,
        NbActionsModule,
     ],
      providers: [ 
        { provide: AuthService, useClass: AuthServiceTesting },
        DatePipe,
        EnvService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              courseId: 1,
            }),
          },
        },
       ],
    })
      .compileComponents();
      httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivityListComponent);
    component = fixture.componentInstance;
    component.course = {user_roles:[]};
    fixture.detectChanges();
  });

  it('should create', () => {
    const institutionResponse: any = apiServiceTesting.getData('/institution/1/');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/'));
    getRequest.flush(institutionResponse);
    expect(component).toBeTruthy();
  });

});
