import { Component } from '@angular/core';
import { DefaultFilter } from 'ng2-smart-table';

@Component({
  selector: 'ngx-list-sub-header-instrument',
  templateUrl: './list-sub-header-instrument.component.html',
  styleUrls: ['./list-sub-header-instrument.component.scss'],
})
export class ListSubHeaderComponent extends DefaultFilter {

  constructor() {
    super();
  }

  // ngOnInit() {
  //   const config = {...this.column.filter};
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.query) {
  //   }
  // }
}
