import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { EnvService } from '../../../@core/env/env.service';

import { DashboardWidgetsComponent } from './dashboard-widgets.component';

describe('DashboardWidgetsComponent', () => {
  let component: DashboardWidgetsComponent;
  let fixture: ComponentFixture<DashboardWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardWidgetsComponent ],
      imports: [ 
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
        RouterTestingModule,
        TranslateModule.forRoot() 
      ],
      providers: [ AuthService,
        EnvService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
