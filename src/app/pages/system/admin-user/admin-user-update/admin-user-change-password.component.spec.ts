import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AdminUserChangePasswordComponent } from './admin-user-change-password.component';

describe('AdminUserChangePasswordComponent', () => {
  let component: AdminUserChangePasswordComponent;
  let fixture: ComponentFixture<AdminUserChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserChangePasswordComponent ],
      imports: [
          RouterTestingModule,
          TranslateModule.forRoot(),
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
