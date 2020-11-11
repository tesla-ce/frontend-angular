import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { NbInputModule } from '@nebular/theme';

import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { SideMenuModule } from '../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateUserComponent } from './create-user/create-user.component';


@NgModule({
  imports: [
    UserManagementRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbInputModule,
  ],
  declarations: [
    UserManagementComponent,
    CreateUserComponent
  ],
})
export class UserManagementModule {
}