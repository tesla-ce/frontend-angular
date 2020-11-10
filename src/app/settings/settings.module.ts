import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SideMenuModule } from '../side-menu/side-menu.module';

@NgModule({
  imports: [
    SettingsRoutingModule,
    ThemeModule,
    SideMenuModule
  ],
  declarations: [
    SettingsComponent
  ],
})
export class SettingsModule {
}
