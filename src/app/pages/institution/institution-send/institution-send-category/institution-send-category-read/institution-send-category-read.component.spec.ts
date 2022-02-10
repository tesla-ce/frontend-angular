import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbActionsModule, NbFormFieldModule, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { AuthServiceTesting } from '../../../../../@core/auth/auth.service.mock';
import { EnvService } from '../../../../../@core/env/env.service';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { CreateModule } from '../../../../../crud/create/create.module';
import { ListModule } from '../../../../../crud/list/list.module';
import { ReadModule } from '../../../../../crud/read/read.module';
import { UpdateModule } from '../../../../../crud/update/update.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';

import { InstitutionSendCategoryReadComponent } from './institution-send-category-read.component';

describe('InstitutionSendCategoryReadComponent', () => {
  let component: InstitutionSendCategoryReadComponent;
  let fixture: ComponentFixture<InstitutionSendCategoryReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendCategoryReadComponent ],
      imports: [ 
        RouterTestingModule,
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        SideMenuModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbActionsModule,
        NbFormFieldModule,
        NbIconModule,
        ListModule,
        CreateModule,
        ReadModule,
        UpdateModule,
        TranslateModule.forRoot(),
      ],
      providers: [ EnvService, { provide: AuthService, useClass: AuthServiceTesting } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendCategoryReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
