import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { EnvService } from '../../../@core/env/env.service';

import { EnrolmentDefaultComponent } from './enrolment-default.component';

describe('EnrolmentDefaultComponent', () => {
  let component: EnrolmentDefaultComponent;
  let fixture: ComponentFixture<EnrolmentDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolmentDefaultComponent ],
      imports: [ 
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot() 
      ],
      providers: [ 
        AuthService,
        EnvService 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolmentDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
