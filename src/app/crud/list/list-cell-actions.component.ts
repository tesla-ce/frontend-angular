import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { DeleteDialogComponent } from './delete-dialog.component';

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

  ngOnInit() {
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: NbDialogService,
  ) { }

  read() {
    this.router.navigate([this.value?.readRoute || 'read', this.rowData.id], { relativeTo: this.route });
  }

  update() {
    this.router.navigate([this.value?.updateRoute || 'update', this.rowData.id], { relativeTo: this.route });
  }

  delete(event) {
    this.dialog.open(DeleteDialogComponent)
      .onClose.subscribe(data => {
        // console.log(data)
      });
  }

}
