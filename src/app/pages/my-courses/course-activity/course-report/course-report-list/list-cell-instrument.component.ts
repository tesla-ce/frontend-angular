import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-list-cell-instrument',
  templateUrl: './list-cell-instrument.component.html',
  styleUrls: ['./list-cell-instrument.component.scss'],
})
export class ListCellInstrumentComponent implements ViewCell, OnInit {

  @Input() value;
  @Input() rowData: any;
  cellData: any;

  ngOnInit() {
    [this.cellData] = this.rowData.detail.filter( item => item.instrument_id === this.value.id);
  }

  constructor(

  ) { }

}
