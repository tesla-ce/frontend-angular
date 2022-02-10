import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbActionsModule, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ReadModule } from '../../../../crud/read/read.module';

import { InstitutionUserReadComponent } from './institution-user-read.component';

describe('InstitutionUserReadComponent', () => {
  let component: InstitutionUserReadComponent;
  let fixture: ComponentFixture<InstitutionUserReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserReadComponent ],
      imports: [ RouterTestingModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbActionsModule,
        NbIconModule,
        ReadModule,
        TranslateModule.forRoot(),
      ],
      providers: [ EnvService,
        { provide: AuthService, useClass: AuthServiceTesting } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
