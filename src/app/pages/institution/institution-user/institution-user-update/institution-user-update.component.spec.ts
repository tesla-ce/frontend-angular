import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbToastrModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';
import { UpdateModule } from '../../../../crud/update/update.module';

import { InstitutionUserUpdateComponent } from './institution-user-update.component';

describe('InstitutionUserUpdateComponent', () => {
  let component: InstitutionUserUpdateComponent;
  let fixture: ComponentFixture<InstitutionUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserUpdateComponent ],
      imports: [ RouterTestingModule,
        NbDialogModule.forRoot(),
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        NbToastrModule.forRoot(),
        ThemeModule,
        NbCardModule,
        NbButtonModule,
        NbActionsModule,
        NbIconModule,
        UpdateModule,
        TranslateModule.forRoot(),
     ],
      providers: [ ThemeModule.forRoot().providers,
        AuthService,
        EnvService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
