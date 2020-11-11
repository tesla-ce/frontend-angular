import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbSelectModule
} from '@nebular/theme';

import { IcManagementComponent } from './ic-management.component';
import { IcManagementRoutingModule } from './ic-management-routing.module';
import { SideMenuModule } from '../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateIcComponent } from './create-ic/create-ic.component';


@NgModule({
  imports: [
    IcManagementRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbDatepickerModule
  ],
  declarations: [
    IcManagementComponent,
    CreateIcComponent
  ],
})
export class IcManagementModule {
}