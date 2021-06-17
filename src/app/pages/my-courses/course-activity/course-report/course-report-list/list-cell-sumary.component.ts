import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-list-cell-sumary',
  templateUrl: './list-cell-sumary.component.html',
  styleUrls: ['./list-cell-sumary.component.scss'],
})
export class ListCellSumaryComponent implements ViewCell, OnInit {

  @Input() value;
  @Input() rowData: any;
  sumary: any = {};

  ngOnInit() {
    this.sumary = {
      content_level: this.getIconStatus(this.rowData.content_level),
      integrity_level: this.getIconStatus(this.rowData.integrity_level),
      identity_level: this.getIconStatus(this.rowData.identity_level),
    };
  }

  constructor(

  ) { }

  getIconStatus(level) {
    switch (level) {
      case 0:
        return 'warning';
      case 1:
          return 'info';
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
