import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { EnvService } from '../../../@core/env/env.service';

import { CourseActivityComponent } from './course-activity.component';

describe('CourseActivityComponent', () => {
  let component: CourseActivityComponent;
  let fixture: ComponentFixture<CourseActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseActivityComponent ],
      imports: [ RouterTestingModule, TranslateModule.forRoot(), NbAuthModule.forRoot(), HttpClientTestingModule ],
      providers: [ AuthService, EnvService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
