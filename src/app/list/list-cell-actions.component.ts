import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-list-cell-actions',
  templateUrl: './list-cell-actions.component.html',
  styleUrls: ['./list-cell-actions.component.scss'],
})
export class ListCellActionsComponent implements ViewCell, OnInit {

  id: string;

  @Input() value;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {}

  constructor(  private route: ActivatedRoute,
                private router: Router ) {}

  update() {
    this.router.navigate(['update', this.rowData.id], {relativeTo: this.route });
  }

  delete() {
    /*
    TO DO:
    - confirm delete pop up
    - call delete endpoint
    - confirm item deleted
    */
  }

}
