import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbIconModule, NbMenuModule, NbSidebarModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { NbTeslaIconsModule, TeslaIconsModule } from '@tesla-ce/icons';
import { AuthService } from '../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../@core/auth/auth.service.mock';
import { CoreModule } from '../../@core/core.module';
import { EnvService } from '../../@core/env/env.service';
import { ThemeModule } from '../../@theme/theme.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        RouterTestingModule,
        SideMenuModule,
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NbSidebarModule.forRoot(),
        CoreModule.forRoot(),
        NbMenuModule.forRoot(),
        ThemeModule,
        BrowserAnimationsModule,
        NbIconModule,
        TeslaIconsModule,
        NbTeslaIconsModule,
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceTesting },
        EnvService,
        ThemeModule.forRoot().providers,
        CoreModule.forRoot().providers,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
