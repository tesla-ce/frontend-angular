import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbIconModule, NbMenuModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { NbTeslaIconsModule, TeslaIconsModule } from '@tesla-ce/icons';
import { AuthService } from '../@core/auth/auth.service';
import { AuthServiceTesting } from '../@core/auth/auth.service.mock';
import { EnvService } from '../@core/env/env.service';
import { ThemeModule } from '../@theme/theme.module';

import { SideMenuComponent } from './side-menu.component';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuComponent ],
      imports: [ NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        CommonModule,
        NbMenuModule,
        BrowserAnimationsModule,
        NbIconModule,
        TeslaIconsModule,
        NbTeslaIconsModule,
       ],
      providers: [ { provide: AuthService, useClass: AuthServiceTesting }, EnvService, ThemeModule.forRoot().providers, NbMenuModule.forRoot().providers ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
