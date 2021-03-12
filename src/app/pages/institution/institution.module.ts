import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { InstitutionComponent } from './institution.component';
import { InstitutionRoutingModule } from './institution-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';


@NgModule({
  imports: [
    InstitutionRoutingModule,
    ThemeModule,
    SideMenuModule,
  ],
  declarations: [
    InstitutionComponent,
  ],
})
export class InstitutionModule {
}
