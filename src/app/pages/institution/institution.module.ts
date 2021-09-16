import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { InstitutionComponent } from './institution.component';
import { InstitutionRoutingModule } from './institution-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { DataManagementComponent } from './data-management/data-management.component';
import { SettingsComponent } from './settings/settings.component';
import { CourseComponent } from './course/course.component';
import { InstitutionSendComponent } from './institution-send/institution-send.component';


@NgModule({
  imports: [
    InstitutionRoutingModule,
    ThemeModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbActionsModule,
    NbCheckboxModule,
  ],
  declarations: [
    InstitutionComponent,
    InstitutionSendComponent,
    DataManagementComponent,
    SettingsComponent,
    CourseComponent,
  ],
})
export class InstitutionModule {
}
