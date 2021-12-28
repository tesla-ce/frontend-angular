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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const config = {...this.column.filter};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(changes: SimpleChanges) 
  // eslint-disable-next-line @typescript-eslint/no-empty-function  
  {}
}
