import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule } from '@nebular/theme';
import { AuthService } from '../../../../@core/auth/auth.service';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';
import { UpdateModule } from '../../../../crud/update/update.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminInstrumentUpdateComponent } from './admin-instrument-update.component';

describe('AdminInstrumentUpdateComponent', () => {
  let component: AdminInstrumentUpdateComponent;
  let fixture: ComponentFixture<AdminInstrumentUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstrumentUpdateComponent ],
      imports: [ 
            RouterTestingModule,
            NbDialogModule.forRoot(),
            NbAuthModule.forRoot(),
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
            NbCheckboxModule,
            NbIconModule,
            NbActionsModule,
            UpdateModule,
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
    fixture = TestBed.createComponent(AdminInstrumentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
