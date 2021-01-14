import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbFormFieldModule,
} from '@nebular/theme';

import { InstitutionIcComponent } from './institution-ic.component';
import { InstitutionIcRoutingModule } from './institution-ic-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListModule } from '../../crud/list/list.module';
import { CreateModule } from '../../crud/create/create.module';
import { InstitutionIcCreateComponent } from './institution-ic-create/institution-ic-create.component';
import { InstitutionIcUpdateComponent } from './institution-ic-update/institution-ic-update.component';
import { InstitutionIcShowComponent } from './institution-ic-show/institution-ic-show.component';
import { InstitutionIcListComponent } from './institution-ic-list/institution-ic-list.component';

@NgModule({
  imports: [
    InstitutionIcRoutingModule,
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
  ],
  declarations: [
    InstitutionIcComponent,
    InstitutionIcCreateComponent,
    InstitutionIcUpdateComponent,
    InstitutionIcShowComponent,
    InstitutionIcListComponent,
  ],
})
export class InstitutionIcModule {
}
