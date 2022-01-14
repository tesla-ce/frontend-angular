import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbDialogModule, NbToastrModule } from '@nebular/theme';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';

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
