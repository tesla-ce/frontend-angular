import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';

import { CourseActivityListComponent } from './course-activity-list.component';

describe('CourseActivityListComponent', () => {
  let component: CourseActivityListComponent;
  let fixture: ComponentFixture<CourseActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseActivityListComponent],
      imports: [ NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
     ],
      providers: [ AuthService,
        DatePipe,
        EnvService ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
