import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ListModule } from '../../../../crud/list/list.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { CourseActivityReadComponent } from './course-activity-read.component';

describe('CourseActivityReadComponent', () => {
  let component: CourseActivityReadComponent;
  let fixture: ComponentFixture<CourseActivityReadComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseActivityReadComponent],
      imports: [ 
        RouterTestingModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        NbDialogModule.forRoot(),
        TranslateModule.forRoot(),
        ThemeModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        ListModule,
        NbActionsModule,
        BrowserAnimationsModule,
      ],
      providers: [ 
        { provide: AuthService, useClass: AuthServiceTesting },
        EnvService,
        ThemeModule.forRoot().providers,
        { provide: Location, useValue: locationStub },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              courseId: 1,
              activityId: 1,
            }),
          },
        },
       ]
    })
      .compileComponents();
      httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivityReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call getAlternative', () => {
    const activityResponse: any = apiServiceTesting.getData('/institution/1/course/1/activity/1/');
    const getActivityRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/course/1/activity/1/'));
    getActivityRequest.flush(activityResponse);
    const activityInstrumentsResponse: any = apiServiceTesting.getData('/institution/1/course/1/activity/1/instrument/');
    const getActivityInstrumentsRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/course/1/activity/1/instrument/'));
    getActivityInstrumentsRequest.flush(activityInstrumentsResponse);
    component.getAlternative(1);
    expect(component).toBeTruthy();
  });

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });

});
