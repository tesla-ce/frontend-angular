import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NbIconModule } from '@nebular/theme';
import { NbTeslaIconsModule, TeslaIconsModule } from '@tesla-ce/icons';
import { ThemeModule } from '../../../../../@theme/theme.module';

import { ListCellSumaryComponent } from './list-cell-sumary.component';

describe('ListCellSumaryComponent', () => {
  let component: ListCellSumaryComponent;
  let fixture: ComponentFixture<ListCellSumaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCellSumaryComponent ],
      imports: [
        NbIconModule,
        TeslaIconsModule,
        NbTeslaIconsModule,
      ],
      providers: [
        ThemeModule.forRoot().providers,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCellSumaryComponent);
    component = fixture.componentInstance;
    component.rowData = {
      content_level: 0,
      integrity_level: 1,
      identity_level: 2,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
