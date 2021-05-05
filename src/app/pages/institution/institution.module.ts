import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { InstitutionComponent } from './institution.component';
import { InstitutionRoutingModule } from './institution-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    InstitutionRoutingModule,
    ThemeModule,
    SharedModule,
    SideMenuModule,
  ],
  declarations: [
    InstitutionComponent,
  ],
})
export class InstitutionModule {
}
