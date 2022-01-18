import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbLayoutScrollService, NbToastrModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';

import { InstitutionIcListComponent } from './institution-ic-list.component';

describe('InstitutionIcListComponent', () => {
  let component: InstitutionIcListComponent;
  let fixture: ComponentFixture<InstitutionIcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIcListComponent ],
      imports: [ NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        NbToastrModule.forRoot(),
     ],
      providers: [ AuthService,
        ThemeModule.forRoot().providers,
        EnvService,
        NbLayoutScrollService,
        DatePipe ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
