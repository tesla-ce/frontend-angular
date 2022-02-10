import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbIconModule, NbActionsModule, NbDatepickerModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { ListModule } from '../../../../../crud/list/list.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';

import { InstitutionSendUserListComponent } from './institution-send-user-list.component';

describe('InstitutionSendUserListComponent', () => {
  let component: InstitutionSendUserListComponent;
  let fixture: ComponentFixture<InstitutionSendUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendUserListComponent ],
      imports: [ NbAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ThemeModule,
        FormsModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
        NbActionsModule,
        NbDatepickerModule,
        NbIconModule,
        ListModule,
        Ng2SmartTableModule,
      ],
      providers: [ 
        ThemeModule.forRoot().providers,
        { provide: AuthService, useClass: AuthServiceTesting },
        EnvService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
