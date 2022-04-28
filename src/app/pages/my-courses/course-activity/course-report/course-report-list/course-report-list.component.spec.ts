import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbIconModule, NbActionsModule, NbSelectModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { ListModule } from '../../../../../crud/list/list.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';

import { CourseReportListComponent } from './course-report-list.component';

describe('CourseReportListComponent', () => {
  let component: CourseReportListComponent;
  let fixture: ComponentFixture<CourseReportListComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseReportListComponent ],
      imports: [
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ThemeModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        ListModule,
        NbActionsModule,
        NbIconModule,
        NbSelectModule,
      ],
      providers: [
        ThemeModule.forRoot().providers,
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: Location, useValue: locationStub },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              courseId: 1,
              activityId:1,
            }),
          },
        },
        EnvService,
      ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const courseResponse: any = apiServiceTesting.getData('/institution/1/course/1/');
    const getCourseRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/course/1/'));
    getCourseRequest.flush(courseResponse);
    const instrumentsResponse: any = apiServiceTesting.getData('/institution/1/course/1/activity/1/instrument/');
    const getInstrumentsRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/course/1/activity/1/instrument/'));
    getInstrumentsRequest.flush(instrumentsResponse);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create call selectedChangeIdentity method', () => {
    component.selectedChangeIdentity(1)
    expect(component).toBeTruthy();
  });

  it('should create call selectedChangeContent method', () => {
    component.selectedChangeContent(1)
    expect(component).toBeTruthy();
  });

  it('should create call selectedChangeIntegrity method', () => {
    component.selectedChangeIntegrity(1)
    expect(component).toBeTruthy();
  });

  it('should create call resetFilters method', () => {
    component.resetFilters()
    expect(component).toBeTruthy();
  });

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
