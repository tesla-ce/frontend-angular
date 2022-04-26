import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbToastrModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ListModule } from '../../../../crud/list/list.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminInstrumentListComponent } from './admin-instrument-list.component';

describe('AdminInstrumentListComponent', () => {
  let component: AdminInstrumentListComponent;
  let fixture: ComponentFixture<AdminInstrumentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstrumentListComponent ],
      imports: [
          NbAuthModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule,
          NbToastrModule.forRoot(),
          TranslateModule.forRoot(),
          ThemeModule,
          SideMenuModule,
          NbCardModule,
          NbButtonModule,
          NbIconModule,
          NbActionsModule,
          ListModule,
      ],
      providers: [
          ThemeModule.forRoot().providers,
          { provide: AuthService, useClass: AuthServiceTesting },
          EnvService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstrumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
