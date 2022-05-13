import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { AdminUserChangePasswordComponent } from './admin-user-change-password.component';

describe('AdminUserChangePasswordComponent', () => {
  let component: AdminUserChangePasswordComponent;
  let fixture: ComponentFixture<AdminUserChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserChangePasswordComponent ],
      imports: [
          RouterTestingModule,
          NbCardModule,
          CreateModule,
          TranslateModule.forRoot(),
      ],
      providers: [
        ThemeModule.forRoot().providers,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
