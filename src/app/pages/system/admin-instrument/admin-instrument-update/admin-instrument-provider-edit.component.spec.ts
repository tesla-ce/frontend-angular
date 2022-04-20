import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';
import { UpdateModule } from '../../../../crud/update/update.module';
import { AdminInstrumentProviderEditComponent } from './admin-instrument-provider-edit.component';

describe('AdminInstrumentProviderEditComponent', () => {
  let component: AdminInstrumentProviderEditComponent;
  let fixture: ComponentFixture<AdminInstrumentProviderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstrumentProviderEditComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NbCardModule,
        TranslateModule.forRoot(),
        UpdateModule,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceTesting },
        EnvService,
        ThemeModule.forRoot().providers,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstrumentProviderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
