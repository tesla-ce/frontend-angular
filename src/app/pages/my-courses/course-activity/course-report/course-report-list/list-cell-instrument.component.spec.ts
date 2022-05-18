import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NbIconModule } from '@nebular/theme';
import { NbTeslaIconsModule, TeslaIconsModule } from '@tesla-ce/icons';
import { ThemeModule } from '../../../../../@theme/theme.module';

import { ListCellInstrumentComponent } from './list-cell-instrument.component';

describe('ListCellInstrumentComponent', () => {
  let component: ListCellInstrumentComponent;
  let fixture: ComponentFixture<ListCellInstrumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCellInstrumentComponent ],
      imports: [
        NbIconModule,
        TeslaIconsModule,
        NbTeslaIconsModule,
      ],
      providers: [
        ThemeModule.forRoot().providers,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCellInstrumentComponent);
    component = fixture.componentInstance;
    component.rowData = {
      detail: [
        {
          instrument_id:1,
          content_level: 0,
          integrity_level: 1,
          identity_level: 2,
        }
      ]
    };
    component.value = {
      id:1
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
