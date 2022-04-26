import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbActionsModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule } from '@nebular/theme';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';
import { UpdateModule } from '../../../../crud/update/update.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminInstitutionUpdateComponent } from './admin-institution-update.component';

describe('AdminInstitutionUpdateComponent', () => {
  let component: AdminInstitutionUpdateComponent;
  let fixture: ComponentFixture<AdminInstitutionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstitutionUpdateComponent ],
      imports: [
            RouterTestingModule,
            HttpClientTestingModule,
            NbToastrModule.forRoot(),
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
            UpdateModule,
      ],
      providers: [
          ThemeModule.forRoot().providers,
          EnvService,
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstitutionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
