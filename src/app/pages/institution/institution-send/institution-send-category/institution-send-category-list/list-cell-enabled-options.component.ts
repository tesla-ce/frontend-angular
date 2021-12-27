import { Component, OnInit, Input} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-list-cell-enabled-options',
  templateUrl: './list-cell-enabled-options.component.html',
  styleUrls: ['./list-cell-enabled-options.component.scss'],
})
export class ListCellEnabledOptionsComponent implements ViewCell, OnInit {

  id: string;

  @Input() value;
  @Input() rowData: any;

  icons = {
    big_fonts: 'text-height',
    text_to_speech: 'assistive-listening-systems',
    high_contrast: 'adjust',
  };

  ngOnInit() {
    if (!this.rowData.data) this.rowData.data = {enabled_options: []};
  }
}
