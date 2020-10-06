import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    SettingsRoutingModule,
    ThemeModule,
    NbMenuModule,
  ],
  declarations: [
    SettingsComponent,
  ],
})
export class SettingsModule {
}
