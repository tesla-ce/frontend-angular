import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';

import { InstitutionIcReadComponent } from './institution-ic-read.component';

describe('InstitutionIcShowComponent', () => {
  let component: InstitutionIcReadComponent;
  let fixture: ComponentFixture<InstitutionIcReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIcReadComponent ],
      imports: [ RouterTestingModule, NbAuthModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot() ],
      providers: [ AuthService, EnvService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIcReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
