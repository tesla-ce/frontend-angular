import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbDialogService, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ThemeModule } from '../../@theme/theme.module';
import { ListCellActionsComponent } from './list-cell-actions.component';

class DialogMock {
  open() {
    return {
      onClose: of({})
    }
  }
}

describe('ListCellActionsComponent', () => {
  let component: ListCellActionsComponent;
  let fixture: ComponentFixture<ListCellActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCellActionsComponent],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        NbIconModule,
        NbEvaIconsModule,
      ],
      providers: [
        ThemeModule.forRoot().providers,
        {provide: ActivatedRoute,
          useValue: {
            route: '/',
            snapshot:  new ActivatedRouteSnapshot(),
          },},
          { provide: NbDialogService, useClass: DialogMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCellActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.rowData = {id:1};
    component.value = {};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call read method', () => {
    component.read()
    expect(component).toBeTruthy();
  });

  it('should call update method', () => {
    component.update()
    expect(component).toBeTruthy();
  });

  it('should call  method', () => {
    component.delete()
    expect(component).toBeTruthy();
  });

  it('should call report method', () => {
    component.report()
    expect(component).toBeTruthy();
  });

});
