import { NgModule } from '@angular/core';
import { NbIconModule } from '@nebular/theme';

import { InstitutionSendRoutingModule } from './institution-send-routing.module';
import { ListCellDisabledInstrumentsComponent } from './institution-send-category/institution-send-category-list/list-cell-disabled-instruments.component';
import { ListCellEnabledOptionsComponent } from './institution-send-category/institution-send-category-list/list-cell-enabled-options.component';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    InstitutionSendRoutingModule,
    CommonModule,
    NbIconModule,
  ],
  declarations: [
    ListCellDisabledInstrumentsComponent,
    ListCellEnabledOptionsComponent,
  ],
})
export class InstitutionSendModule {
}
