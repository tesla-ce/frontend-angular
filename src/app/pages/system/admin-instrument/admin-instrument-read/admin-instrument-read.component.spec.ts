import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbFormFieldModule, NbCheckboxModule, NbIconModule, NbActionsModule } from '@nebular/theme';
import { EnvService } from '../../../../@core/env/env.service';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ReadModule } from '../../../../crud/read/read.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';

import { AdminInstrumentReadComponent } from './admin-instrument-read.component';

describe('AdminInstrumentReadComponent', () => {
  let component: AdminInstrumentReadComponent;
  let fixture: ComponentFixture<AdminInstrumentReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInstrumentReadComponent ],
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
            NbCheckboxModule,
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
    fixture = TestBed.createComponent(AdminInstrumentReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
