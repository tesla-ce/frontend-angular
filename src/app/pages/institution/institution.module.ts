import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { InstitutionComponent } from './institution.component';
import { InstitutionRoutingModule } from './institution-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';
import { SettingsComponent } from './settings/settings.component';
import { InstitutionSendComponent } from './institution-send/institution-send.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    InstitutionRoutingModule,
    ThemeModule,
    SideMenuModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbActionsModule,
    NbCheckboxModule,
    SharedModule,
  ],
  declarations: [
    InstitutionComponent,
    InstitutionSendComponent,
    SettingsComponent,
  ],
})
export class InstitutionModule {
}
