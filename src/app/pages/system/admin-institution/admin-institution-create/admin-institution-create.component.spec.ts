import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbActionsModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminInstitutionCreateComponent } from './admin-institution-create.component';

describe('AdminInstitutionCreateComponent', () => {
  let component: AdminInstitutionCreateComponent;
  let fixture: ComponentFixture<AdminInstitutionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstitutionCreateComponent ],
      imports: [
            HttpClientTestingModule,
            NbToastrModule.forRoot(),
            RouterTestingModule,
            TranslateModule.forRoot(),
            ThemeModule,
            FormsModule,
            ReactiveFormsModule,
            SideMenuModule,
            NbCardModule,
            NbButtonModule,
            NbInputModule,
            NbSelectModule,
            NbFormFieldModule,
            NbIconModule,
            NbActionsModule,
            CreateModule,
      ],
      providers: [
          ThemeModule.forRoot().providers,
          EnvService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstitutionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
