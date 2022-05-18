import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbDialogRef, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { TeslaIconsModule, NbTeslaIconsModule } from '@tesla-ce/icons';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { CourseActivityInstrumentSettingsComponent } from './course-activity-instrument-settings.component';

class DialogMock {
  close() {
    return true;
  }
}

describe('CourseActivityInstrumentSettingsComponent', () => {
  let component: CourseActivityInstrumentSettingsComponent;
  let fixture: ComponentFixture<CourseActivityInstrumentSettingsComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseActivityInstrumentSettingsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NbCardModule,
        NbIconModule,
        CreateModule,
        TeslaIconsModule,
        NbTeslaIconsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: NbDialogRef, useClass: DialogMock },
        EnvService,
        ThemeModule.forRoot().providers,
      ]
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivityInstrumentSettingsComponent);
    component = fixture.componentInstance;
    component.instrument = {
      active: true,
      instrument_id: 1,
      id:1,
      options: [],
      required: true,
      instrument: {
        name: 'test',
        acronym: 'tst',
        description: 'this is a test instrument',
      }
    };
    component.institutionId = 1;
    component.courseId = 1;
    component.activityId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close', () => {
    component.dismiss();
    expect(component).toBeTruthy();
  });

  it('should call save', () => {
    component.save();
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/course/1/activity/1/instrument/1/'));
    const updateResponse = apiServiceTesting.getData('/institution/1/course/1/activity/1/instrument/1/');
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush(updateResponse);
    expect(component).toBeTruthy();
  });
});
