import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbMenuModule, NbSidebarModule } from '@nebular/theme';
import { AuthService } from '../../@core/auth/auth.service';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { EnvService } from '../../@core/env/env.service';

import { AdminComponent } from './admin.component';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CoreModule } from '../../@core/core.module';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [
        RouterTestingModule,
        SideMenuModule,
        NbSidebarModule.forRoot(),
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        CoreModule.forRoot(),
        NbMenuModule.forRoot(),
      ],
      providers: [
        ThemeModule.forRoot().providers,
        CoreModule.forRoot().providers,
        AuthService,
        EnvService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});