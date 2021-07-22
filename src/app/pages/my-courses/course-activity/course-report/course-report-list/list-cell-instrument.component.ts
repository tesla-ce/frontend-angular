import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
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
  sumary: any = {};

  ngOnInit() {
    [this.cellData] = this.rowData.detail.filter( item => item.instrument_id === this.value.id);
    this.sumary = {
      content_level: this.getIconStatus(this.cellData.content_level),
      integrity_level: this.getIconStatus(this.cellData.integrity_level),
      identity_level: this.getIconStatus(this.cellData.identity_level),
    };
  }

  constructor(

  ) { }

  getIconStatus(level) {
    switch (level) {
      case 0:
        return 'disabled';
      case 1:
          return 'disabled';
      case 2:
          return 'success';
      case 3:
          return 'warning';
      case 4:
          return 'error';
      default:
        break;
    }
  }
}
