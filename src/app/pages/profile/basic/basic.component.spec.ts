import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbSelectModule, NbToastrModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { EnvService } from '../../../@core/env/env.service';
import { ThemeModule } from '../../../@theme/theme.module';
import { CreateModule } from '../../../crud/create/create.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { BasicComponent } from './basic.component';

describe('BasicComponent', () => {
  let component: BasicComponent;
  let fixture: ComponentFixture<BasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicComponent ],
      imports: [ 
        NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        NbToastrModule.forRoot(),
        ThemeModule,
        SideMenuModule,
        NbCheckboxModule,
        NbSelectModule,
        NbCardModule,
        NbButtonModule,
        CreateModule,
        TranslateModule.forRoot(),
      ],
      providers: [ 
        AuthService,
        EnvService,
        ThemeModule.forRoot().providers ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
