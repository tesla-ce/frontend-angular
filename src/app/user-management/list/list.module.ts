import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import {
  NbIconModule,
  NbSelectModule,
  NbFormFieldModule,
  NbInputModule,
  NbButtonModule,
} from '@nebular/theme';

import { ListComponent } from './list.component';
import { ListCellActionsComponent } from './list-cell-actions.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    Ng2SmartTableModule,
    ThemeModule,
    NbIconModule,
    NbSelectModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
  ],
  declarations: [
    ListComponent,
    ListCellActionsComponent,
  ],
  exports: [
      ListComponent,
  ],
})
export class ListModule {
}
