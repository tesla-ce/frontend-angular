import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbDialogService, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbTabsetModule, NbToggleModule, NbWindowModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NbTeslaIconsModule, TeslaIconsModule } from '@tesla-ce/icons';
import { of } from 'rxjs';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ApiServiceTesting } from '../../../../@core/mock/api.service.mock';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { ListModule } from '../../../../crud/list/list.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { CourseActivityInstrumentComponent } from './course-activity-instrument.component';

describe('CourseActivityInstrumentComponent', () => {
  let component: CourseActivityInstrumentComponent;
  let fixture: ComponentFixture<CourseActivityInstrumentComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  class DialogMock {
    open() {
      return {
        onClose: of({})
      }
    }
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseActivityInstrumentComponent],
      imports: [ 
        NbWindowModule.forRoot(),
        TranslateModule.forRoot(),
        NbAuthModule.forRoot(),
        HttpClientTestingModule, 
        RouterTestingModule,
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
        ListModule,
        CreateModule,
        NbActionsModule,
        NbTabsetModule,
        JsonFormsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        TeslaIconsModule,
        NbTeslaIconsModule,
        BrowserAnimationsModule,
    ],
      providers: [
        ThemeModule.forRoot().providers,
        { provide: AuthService, useClass: AuthServiceTesting },
        { provide: NbDialogService, useClass: DialogMock },
        EnvService,
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
    fixture = TestBed.createComponent(CourseActivityInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call enableDisable instrument', () => {
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
    component.activity = {
      enabled:true,
    };
    fixture.detectChanges();
    component.enableDisableInstrument();
    expect(component).toBeTruthy();
  });

  it('should call delete instrument', () => {
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
    component.activity = {
      enabled:true,
    };
    fixture.detectChanges();
    component.delete();
    expect(component).toBeTruthy();
  });

  it('should call delete instrument', () => {
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
    component.activity = {
      enabled:true,
    };
    fixture.detectChanges();
    component.delete();
    const deleteRequest = httpMock.expectOne(apiServiceTesting.getUrl('/institution/1/course/1/activity/1/instrument/1/'));
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush(true);
    expect(component).toBeTruthy();
  });

  it('should call add alternative', () => {
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
    component.activity = {
      enabled:true,
    };
    fixture.detectChanges();
    component.addAlternative();
    expect(component).toBeTruthy();
  });

  it('should call settings', () => {
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
    component.activity = {
      enabled:true,
    };
    fixture.detectChanges();
    component.settings();
    expect(component).toBeTruthy();
  });
});
