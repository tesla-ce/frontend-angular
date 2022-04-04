import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListCellEnabledOptionsComponent } from './list-cell-enabled-options.component';

describe('ListCellEnabledOptionsComponent', () => {
  let component: ListCellEnabledOptionsComponent;
  let fixture: ComponentFixture<ListCellEnabledOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCellEnabledOptionsComponent],
      imports: [
        RouterTestingModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCellEnabledOptionsComponent);
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
