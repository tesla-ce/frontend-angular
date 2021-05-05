import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
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
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: NbDialogService,
  ) { }

  read() {
    const path = [];
    if (this.value && this.value.read && this.value.read.path) path.push(this.value.read.path);
    path.push(this.rowData.id);
    this.router.navigate(path, { relativeTo: this.route });
  }

  update() {
    const path = [];
    if (this.value && this.value.update && this.value.update.path) path.push(this.value.update.path);
    path.push(this.rowData.id);
    path.push('update');
    this.router.navigate(path, { relativeTo: this.route });
  }

  delete(event) {
    this.dialog.open(DeleteDialogComponent)
      .onClose.subscribe(data => {
        // console.log(data)
      });
  }

}
