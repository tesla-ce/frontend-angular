import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
} from '@nebular/theme';

import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { SideMenuModule } from '../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateUserComponent } from './create-user/create-user.component';
// import { ListComponent } from './list/list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    UserManagementRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    UserManagementComponent,
    CreateUserComponent,
    // ListComponent,
  ],
})
export class UserManagementModule {
}
