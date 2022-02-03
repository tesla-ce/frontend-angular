import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { EnvService } from '../../../../../@core/env/env.service';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { UpdateModule } from '../../../../../crud/update/update.module';
import { SideMenuModule } from '../../../../../side-menu/side-menu.module';

import { InstitutionSendCategoryUpdateComponent } from './institution-send-category-update.component';

describe('InstitutionSendCategoryUpdateComponent', () => {
  let component: InstitutionSendCategoryUpdateComponent;
  let fixture: ComponentFixture<InstitutionSendCategoryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionSendCategoryUpdateComponent ],
      imports: [ RouterTestingModule,
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
        NbToastrModule.forRoot(),
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
        UpdateModule,
        TranslateModule.forRoot(),
      ],
      providers: [ EnvService,
        NbThemeModule.forRoot().providers,
        AuthService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionSendCategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
