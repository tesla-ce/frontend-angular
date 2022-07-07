import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbCardModule, NbDialogRef, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DeleteDialogComponent } from './delete-dialog.component';
class DialogRefMock {
  close() {
    return true;
  }
}

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDialogComponent],
      imports: [
        TranslateModule.forRoot(),
        NbIconModule,
        NbCardModule,
        NbEvaIconsModule,
      ],
      providers: [
        ThemeModule.forRoot().providers,
        { provide: NbDialogRef, useClass: DialogRefMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
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

  it('should call delete method', () => {
    component.delete();
    expect(component).toBeTruthy();
  });
});
