import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { InstitutionComponent } from './institution.component';
import { InstitutionRoutingModule } from './institution-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { NbActionsModule, NbButtonModule, NbCardModule } from '@nebular/theme';
import { SendComponent } from './send/send.component';
import { DataManagementComponent } from './data-management/data-management.component';
import { SettingsComponent } from './settings/settings.component';
import { CourseComponent } from './course/course.component';


@NgModule({
  imports: [
    InstitutionRoutingModule,
    ThemeModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbActionsModule,
  ],
  declarations: [
    InstitutionComponent,
    SendComponent,
    DataManagementComponent,
    SettingsComponent,
    CourseComponent,
  ],
})
export class InstitutionModule {
}
