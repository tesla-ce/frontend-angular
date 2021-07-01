import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { EnrolmentComponent } from './enrolment.component';
import { EnrolmentRoutingModule } from './enrolment-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { EnrolmentDefaultComponent } from './enrolment-default/enrolment-default.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbActionsModule } from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    EnrolmentRoutingModule,
    ThemeModule,
    SideMenuModule,
    NbButtonModule,
    NbCardModule,
    NbActionsModule,
    // i18n
    SharedModule,
    // tesla icons
    NbIconModule,
  ],
  declarations: [
    EnrolmentComponent,
    EnrolmentDefaultComponent,
  ],
})
export class EnrolmentModule {
}
