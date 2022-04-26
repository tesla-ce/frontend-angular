import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { ListModule } from '../../../../../crud/list/list.module';
import { ReadModule } from '../../../../../crud/read/read.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';

import { InstitutionSendUserReadComponent } from './institution-send-user-read.component';

describe('InstitutionSendUserReadComponent', () => {
  let component: InstitutionSendUserReadComponent;
  let fixture: ComponentFixture<InstitutionSendUserReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendUserReadComponent ],
      imports: [ RouterTestingModule,
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
        TranslateModule.forRoot(),
        NbDialogModule.forRoot(),
        NbToastrModule.forRoot(),
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbIconModule,
        NbActionsModule,
        NbFormFieldModule,
        NbDatepickerModule,
        NbIconModule,
        ListModule,
        ReadModule,
        Ng2SmartTableModule,
    ],
      providers: [ ThemeModule.forRoot().providers,
        EnvService,
        { provide: AuthService, useClass: AuthServiceTesting },
        DatePipe ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendUserReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
