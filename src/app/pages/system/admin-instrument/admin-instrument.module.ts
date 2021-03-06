import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbFormFieldModule,
  NbCheckboxModule,
  NbActionsModule,
} from '@nebular/theme';

import { AdminInstrumentComponent } from './admin-instrument.component';
import { AdminInstrumentRoutingModule } from './admin-instrument-routing.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListModule } from '../../../crud/list/list.module';
import { CreateModule } from '../../../crud/create/create.module';
import { AdminInstrumentCreateComponent } from './admin-instrument-create/admin-instrument-create.component';
import { AdminInstrumentUpdateComponent } from './admin-instrument-update/admin-instrument-update.component';
import { AdminInstrumentReadComponent } from './admin-instrument-read/admin-instrument-read.component';
import { AdminInstrumentListComponent } from './admin-instrument-list/admin-instrument-list.component';
import { ReadModule } from '../../../crud/read/read.module';
import { UpdateModule } from '../../../crud/update/update.module';
import { AdminInstrumentProviderAddComponent } from './admin-instrument-update/admin-instrument-provider-add.component';
import { AdminInstrumentProviderEditComponent } from './admin-instrument-update/admin-instrument-provider-edit.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    AdminInstrumentRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbFormFieldModule,
    NbCheckboxModule,
    NbIconModule,
    NbActionsModule,
    ListModule,
    CreateModule,
    ReadModule,
    UpdateModule,
    SharedModule,
  ],
  declarations: [
    AdminInstrumentComponent,
    AdminInstrumentCreateComponent,
    AdminInstrumentUpdateComponent,
    AdminInstrumentReadComponent,
    AdminInstrumentListComponent,
    AdminInstrumentProviderAddComponent,
    AdminInstrumentProviderEditComponent,
  ],
})
export class AdminInstrumentModule {
}
