import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-list-cell-disabled-instruments',
  templateUrl: './list-cell-disabled-instruments.component.html',
  styleUrls: ['./list-cell-disabled-instruments.component.scss'],
})
export class ListCellDisabledInstrumentsComponent implements ViewCell, OnInit {

  id: string;

  @Input() value;
  @Input() rowData: any;

  icons = {};

  ngOnInit() {
    this.value.instruments.map( instrument => {
        this.icons[instrument.id] = instrument.acronym;
    });
  }

}
