import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';

import { CourseActivityInstrumentComponent } from './course-activity-instrument.component';

describe('CourseActivityInstrumentComponent', () => {
  let component: CourseActivityInstrumentComponent;
  let fixture: ComponentFixture<CourseActivityInstrumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseActivityInstrumentComponent],
      imports: [ NbWindowModule.forRoot(),
        TranslateModule.forRoot(),
        NbAuthModule.forRoot(),
        HttpClientTestingModule, 
        RouterTestingModule,
        NbDialogModule.forRoot(),
    ],
      providers: [
        ThemeModule.forRoot().providers,
        AuthService,
        EnvService,
    ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivityInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
