import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbFormFieldModule, NbIconModule, NbActionsModule } from '@nebular/theme';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ReadModule } from '../../../../crud/read/read.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminInstitutionReadComponent } from './admin-institution-read.component';

describe('AdminInstitutionReadComponent', () => {
  let component: AdminInstitutionReadComponent;
  let fixture: ComponentFixture<AdminInstitutionReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstitutionReadComponent ],
      imports: [
            RouterTestingModule,
            HttpClientTestingModule,
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
            ReadModule,
      ],
      providers: [
          EnvService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstitutionReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
