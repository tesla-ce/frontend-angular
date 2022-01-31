import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ListModule } from '../../../../crud/list/list.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { CourseActivityReadComponent } from './course-activity-read.component';

describe('CourseActivityReadComponent', () => {
  let component: CourseActivityReadComponent;
  let fixture: ComponentFixture<CourseActivityReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseActivityReadComponent],
      imports: [ 
        RouterTestingModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        NbDialogModule.forRoot(),
        TranslateModule.forRoot(),
        ThemeModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        ListModule,
        NbActionsModule,
      ],
      providers: [ 
        AuthService,
        EnvService,
        ThemeModule.forRoot().providers,
       ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivityReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
