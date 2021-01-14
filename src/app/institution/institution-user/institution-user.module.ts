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

import { InstitutionUserComponent } from './institution-user.component';
import { InstitutionUserRoutingModule } from './institution-user-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListModule } from '../../crud/list/list.module';
import { CreateModule } from '../../crud/create/create.module';
import { InstitutionUserCreateComponent } from './institution-user-create/institution-user-create.component';
import { InstitutionUserUpdateComponent } from './institution-user-update/institution-user-update.component';
import { InstitutionUserShowComponent } from './institution-user-show/institution-user-show.component';
import { InstitutionUserListComponent } from './institution-user-list/institution-user-list.component';

@NgModule({
  imports: [
    InstitutionUserRoutingModule,
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
    InstitutionUserComponent,
    InstitutionUserCreateComponent,
    InstitutionUserUpdateComponent,
    InstitutionUserShowComponent,
    InstitutionUserListComponent,
  ],
})
export class InstitutionUserModule {
}
