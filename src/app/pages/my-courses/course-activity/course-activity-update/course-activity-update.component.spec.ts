import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbDialogModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';

import { CourseActivityUpdateComponent } from './course-activity-update.component';

describe('CourseActivityUpdateComponent', () => {
  let component: CourseActivityUpdateComponent;
  let fixture: ComponentFixture<CourseActivityUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseActivityUpdateComponent],
      imports: [ RouterTestingModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NbDialogModule.forRoot(),
       ],
      providers: [ 
        AuthService,
        EnvService,
        ThemeModule.forRoot().providers,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivityUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
