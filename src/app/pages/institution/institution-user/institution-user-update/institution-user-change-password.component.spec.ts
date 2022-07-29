import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbCardModule, NbDialogRef } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../../../@theme/theme.module';
import { CreateModule } from '../../../../crud/create/create.module';
import { InstitutionUserChangePasswordComponent } from './institution-user-change-password.component';

describe('InstitutionUserChangePasswordComponent', () => {
  let component: InstitutionUserChangePasswordComponent;
  let fixture: ComponentFixture<InstitutionUserChangePasswordComponent>;
  class DialogRefMock {
    close() {
      return true;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionUserChangePasswordComponent ],
      imports: [
        RouterTestingModule,
        NbCardModule,
        CreateModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: NbDialogRef, useClass: DialogRefMock },
        ThemeModule.forRoot().providers,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionUserChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dismiss method', () => {
    component.dismiss();
    expect(component).toBeTruthy();
  });

  it('should call onSave method', () => {
    component.onSave({});
    expect(component).toBeTruthy();
  });
});
