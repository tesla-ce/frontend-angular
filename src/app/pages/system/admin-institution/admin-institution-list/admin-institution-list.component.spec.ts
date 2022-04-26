import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminInstitutionListComponent } from './admin-institution-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvService } from '../../../../@core/env/env.service';
import { NbActionsModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListModule } from '../../../../crud/list/list.module';
import { SideMenuModule } from '../../../../side-menu/side-menu.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminInstitutionListComponent', () => {
  let component: AdminInstitutionListComponent;
  let fixture: ComponentFixture<AdminInstitutionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NbToastrModule.forRoot(),
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
        ListModule,
      ],
      declarations: [ AdminInstitutionListComponent ],
      providers: [
        ThemeModule.forRoot().providers,
        EnvService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInstitutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
