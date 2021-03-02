import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import {
  NbIconModule,
  NbSelectModule,
  NbFormFieldModule,
  NbInputModule,
  NbButtonModule,
  NbDialogModule,
  NbCardModule,
} from '@nebular/theme';

import { ListComponent } from './list.component';
import { ListCellActionsComponent } from './list-cell-actions.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DeleteDialogComponent } from './delete-dialog.component';

@NgModule({
  imports: [
    Ng2SmartTableModule,
    ThemeModule,
    NbIconModule,
    NbSelectModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
  ],
  declarations: [
    ListComponent,
    ListCellActionsComponent,
    DeleteDialogComponent,
  ],
  exports: [
      ListComponent,
  ],
})
export class ListModule {
}
