import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbMenuModule, NbSidebarModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../@core/auth/auth.service';
import { CoreModule } from '../../@core/core.module';
import { EnvService } from '../../@core/env/env.service';
import { ThemeModule } from '../../@theme/theme.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';

import { StatisticsComponent } from './statistics.component';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsComponent ],
      imports: [
        RouterTestingModule,
        SideMenuModule,
        NbSidebarModule.forRoot(),
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        CoreModule.forRoot(),
        NbMenuModule.forRoot(),
        ThemeModule,
      ],
      providers: [
        ThemeModule.forRoot().providers,
        AuthService,
        EnvService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
