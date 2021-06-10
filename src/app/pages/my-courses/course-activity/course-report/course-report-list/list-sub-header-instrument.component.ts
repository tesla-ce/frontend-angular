import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DefaultFilter } from 'ng2-smart-table';

@Component({
  selector: 'ngx-list-sub-header-instrument',
  templateUrl: './list-sub-header-instrument.component.html',
  styleUrls: ['./list-sub-header-instrument.component.scss'],
})
export class ListSubHeaderComponent extends DefaultFilter implements OnInit, OnChanges {

  constructor() {
    super();
  }

  ngOnInit() {
    let config: any;
    config = {...this.column.filter};
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.query) {
    }
  }
}
