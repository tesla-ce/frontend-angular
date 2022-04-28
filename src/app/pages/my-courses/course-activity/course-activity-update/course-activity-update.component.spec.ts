import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InjectionToken } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JsonFormsModule } from '@jsonforms/angular';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbDialogService, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbTabsetModule, NbToggleModule, NbWindowService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NbTeslaIconsModule, TeslaIconsModule } from '@tesla-ce/icons';
import { of } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';
import { CourseActivityInstrumentComponent } from '../course-activity-instrument/course-activity-instrument.component';

import { CourseActivityUpdateComponent } from './course-activity-update.component';

describe('CourseActivityUpdateComponent', () => {
  let component: CourseActivityUpdateComponent;
  let fixture: ComponentFixture<CourseActivityUpdateComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());
  const locationStub = {
    back: jasmine.createSpy('back')
  };

  class DialogMock {
    open() {
      return {
        onClose: of({
          "id": 3,
          "name": "test-instrument-3",
          "alternative_to" : null, 
          "acronym": "tst-3",
          "options_schema": "{}",
          "instrument": {
            "id": 3,
            "name": "test-instrument-3",
            "acronym": "tst-3",
            "options_schema": "{}",
          },
        })
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CourseActivityUpdateComponent,
        CourseActivityInstrumentComponent,
      ],
      imports: [ 
        RouterTestingModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NbDialogModule.forRoot(),
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
        NbActionsModule,
        NbTabsetModule,
        JsonFormsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        TeslaIconsModule,
        NbTeslaIconsModule,
        BrowserAnimationsModule,
       ],
      providers: [ 
        ThemeModule.forRoot().providers,
        {provide: NbWindowService, useValue: '', multi: true},
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: Location, useValue: locationStub },
        { provide: NbDialogService, useClass: DialogMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              courseId: 1,
              activityId: 1,
            }),
          },
        },
        EnvService,
        ThemeModule.forRoot().providers,
      ],
    })
      .compileComponents();
      httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivityUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const activityResponse: any = apiServiceTesting.getData('/institution/1/course/1/activity/1/');
    const getActivityRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/course/1/activity/1/'));
    getActivityRequest.flush(activityResponse);
    const activityInstrumentsResponse: any = apiServiceTesting.getData('/institution/1/course/1/activity/1/instrument/');
    const getActivityInstrumentsRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/course/1/activity/1/instrument/'));
    getActivityInstrumentsRequest.flush(activityInstrumentsResponse);
    const institutionInstrumentsResponse: any = apiServiceTesting.getData('/institution/1/instrument/');
    const getInstitutionInstrumentsRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/instrument/'));
    getInstitutionInstrumentsRequest.flush(institutionInstrumentsResponse);
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

  it('should call enableDisableActivity', () => {
    component.enableDisableActivity(true);
    const updateResponse: any = apiServiceTesting.getData('/institution/1/course/1/activity/1/');
    const updateRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/course/1/activity/1/'));
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush(updateResponse);
    expect(component).toBeTruthy();
  });

  it('should call addInstrument', () => {
    component.addInstrument();
    expect(component).toBeTruthy();
  });

  it('should call deleteInstrument', () => {
    component.deleteInstrument({
          "id": 1,
          "name": "test-instrument-2",
          "alternative_to" : null, 
          "acronym": "tst-2",
          "options_schema": "{}",
          "instrument": {
            "id": 2,
            "name": "test-instrument-2",
            "acronym": "tst-2",
            "options_schema": "{}",
          },
        });
    expect(component).toBeTruthy();
  });

  it('should call addAlternative', () => {
    component.addAlternative(1);
    expect(component).toBeTruthy();
  });

  it('should call deleteAlternative', () => {
    component.deleteAlternative({
          "id": 1,
          "name": "test-instrument-2",
          "alternative_to" : null, 
          "acronym": "tst-2",
          "options_schema": "{}",
          "instrument": {
            "id": 2,
            "name": "test-instrument-2",
            "acronym": "tst-2",
            "options_schema": "{}",
          },
        });
    expect(component).toBeTruthy();
  });
});
