import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbToggleModule, NbFormFieldModule, NbIconModule, NbActionsModule, NbIconLibraries } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NbTeslaIconsModule, TeslaIconsModule } from '@tesla-ce/icons';
import { NgxEchartsModule } from 'ngx-echarts';
import { of } from 'rxjs';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { ListModule } from '../../../../../crud/list/list.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';
import { CourseReportReadComponent } from './course-report-read.component';
import { AppModule } from '../../../../../app.module';

describe('CourseReportReadComponent', () => {
  let component: CourseReportReadComponent;
  let fixture: ComponentFixture<CourseReportReadComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseReportReadComponent ],
      imports: [
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbToggleModule,
        NbFormFieldModule,
        RxReactiveFormsModule,
        NbIconModule,
        ListModule,
        NbActionsModule,
        SharedModule,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts')
        }),
        TeslaIconsModule,
        NbTeslaIconsModule,
      ],
      providers: [
        ThemeModule.forRoot().providers,
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: Location, useValue: locationStub },
        EnvService,
        NbIconLibraries,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              courseId: 1,
              activityId:1,
              reportId: 1,
            }),
          },
        },
      ]
    })
    .compileComponents();
    
  }));

  beforeEach(() => {
    const iconLibraries = new NbIconLibraries();
    iconLibraries.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(CourseReportReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const institutionResponse: any = apiServiceTesting.getData('/institution/1/');
    const getInstitutionRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/'));
    getInstitutionRequest.flush(institutionResponse);
    const reportResponse: any = apiServiceTesting.getData('/institution/1/course/1/activity/1/report/1/');
    const getReportRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/course/1/activity/1/report/1/'));
    getReportRequest.flush(reportResponse);
    const reportDataResponse: any = apiServiceTesting.getData('https://test.mock.dev.tesla-ce.eu/report.json');
    const getReportDataRequest = httpMock.expectOne('https://test.mock.dev.tesla-ce.eu/report.json');
    getReportDataRequest.flush(reportDataResponse);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call back method', async () => {
    component.back();
    const location = fixture.debugElement.injector.get(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
