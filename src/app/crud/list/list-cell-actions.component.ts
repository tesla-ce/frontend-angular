import { Component, Input, Output, EventEmitter } from '@angular/core';
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
export class ListCellActionsComponent implements ViewCell {

  id: string;

  @Input() value;
  @Input() rowData: any;

  @Output() edit: EventEmitter<any> = new EventEmitter<number>();
  @Output() remove: EventEmitter<any> = new EventEmitter<number>();

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: NbDialogService,
  ) { }

  read(): void {
    const path = [];
    if (this.value && this.value.read && this.value.read.path) path.push(this.value.read.path);
    path.push(this.rowData.id);
    this.router.navigate(path, { relativeTo: this.route });
  }

  update() : void {
    const path = [];
    if (this.edit.observers.length) {
      this.edit.emit(this.rowData);
    } else {
      if (this.value && this.value.update && this.value.update.path) path.push(this.value.update.path);
      path.push(this.rowData.id);
      path.push('update');
      this.router.navigate(path, { relativeTo: this.route });
    }
  }

  delete(): void {
    this.dialog.open(DeleteDialogComponent)
      .onClose.subscribe(data => {
        if (data === 'delete') {
          this.remove.emit(this.rowData);
        }
      });
  }

  report(): void {
    const path = [];
    if (this.value && this.value.report && this.value.report.path) path.push(this.value.report.path);
    path.push(this.rowData.id);
    path.push('report');
    this.router.navigate(path, { relativeTo: this.route });
  }

}
