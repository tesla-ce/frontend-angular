import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbFormFieldModule,
} from '@nebular/theme';

import { AdminInstitutionComponent } from './admin-institution.component';
import { AdminInstitutionRoutingModule } from './admin-institution-routing.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListModule } from '../../../crud/list/list.module';
import { CreateModule } from '../../../crud/create/create.module';
import { AdminInstitutionCreateComponent } from './admin-institution-create/admin-institution-create.component';
import { AdminInstitutionUpdateComponent } from './admin-institution-update/admin-institution-update.component';
import { AdminInstitutionReadComponent } from './admin-institution-read/admin-institution-read.component';
import { AdminInstitutionListComponent } from './admin-institution-list/admin-institution-list.component';
import { ReadModule } from '../../../crud/read/read.module';
import { UpdateModule } from '../../../crud/update/update.module';

@NgModule({
  imports: [
    AdminInstitutionRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbFormFieldModule,
    NbIconModule,
    ListModule,
    CreateModule,
    ReadModule,
    UpdateModule,
  ],
  declarations: [
    AdminInstitutionComponent,
    AdminInstitutionCreateComponent,
    AdminInstitutionUpdateComponent,
    AdminInstitutionReadComponent,
    AdminInstitutionListComponent,
  ],
})
export class AdminInstitutionModule {
}
