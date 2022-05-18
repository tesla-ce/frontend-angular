import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListCellDisabledInstrumentsComponent } from './list-cell-disabled-instruments.component';

describe('ListCellDisabledInstrumentsComponent', () => {
  let component: ListCellDisabledInstrumentsComponent;
  let fixture: ComponentFixture<ListCellDisabledInstrumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCellDisabledInstrumentsComponent],
      imports: [
        RouterTestingModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCellDisabledInstrumentsComponent);
    component = fixture.componentInstance;
    component.value = {
      instruments:[
        {
          "id": 1,
          "name": "test-instrument-1",
          "acronym": "test-1",
        },
        {
          "id": 1,
          "name": "test-instrument-2",
          "acronym": "test-2",
        },
      ]
    };

    component.rowData = {
      data: {
        disabledInstruments: [1]
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
