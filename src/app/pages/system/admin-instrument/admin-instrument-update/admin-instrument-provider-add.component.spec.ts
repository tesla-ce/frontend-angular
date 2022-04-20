import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { AdminInstrumentProviderAddComponent } from './admin-instrument-provider-add.component';

describe('AdminInstrumentProviderAddComponent', () => {
  let component: AdminInstrumentProviderAddComponent;
  let fixture: ComponentFixture<AdminInstrumentProviderAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstrumentProviderAddComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NbCardModule,
        CreateModule,
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
    fixture = TestBed.createComponent(AdminInstrumentProviderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
