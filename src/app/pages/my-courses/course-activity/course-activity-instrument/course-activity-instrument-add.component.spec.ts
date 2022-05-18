import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbDialogRef, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { CourseActivityInstrumentAddComponent } from './course-activity-instrument-add.component';

class DialogMock {
  close() {
    return true;
  }
}

describe('CourseActivityInstrumentAddComponent', () => {
  let component: CourseActivityInstrumentAddComponent;
  let fixture: ComponentFixture<CourseActivityInstrumentAddComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseActivityInstrumentAddComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NbIconModule,
        NbCardModule,
        CreateModule,
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
    fixture = TestBed.createComponent(CourseActivityInstrumentAddComponent);
    component = fixture.componentInstance;
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

  it('should call back', () => {
    component.back();
    expect(component).toBeTruthy();
  });

  it('should call select', () => {
    component.select({
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
    });
    expect(component).toBeTruthy();
  });

  it('should call save', () => {
    component.selectedInstrument = {
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
    component.save();
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/course/1/activity/1/instrument/'));
    const updateResponse = apiServiceTesting.getData('/institution/1/course/1/activity/1/instrument/');
    expect(updateRequest.request.method).toBe('POST');
    updateRequest.flush(updateResponse);
    expect(component).toBeTruthy();
  });
});
