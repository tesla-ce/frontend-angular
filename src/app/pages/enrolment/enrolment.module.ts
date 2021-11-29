import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { EnrolmentComponent } from './enrolment.component';
import { EnrolmentRoutingModule } from './enrolment-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';
import { EnrolmentDefaultComponent } from './enrolment-default/enrolment-default.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbActionsModule,
  NbLayoutModule,
  NbProgressBarModule,
} from '@nebular/theme';
import { SharedModule } from '../../shared/shared.module';
import {EnrolmentStatusModule} from '../../common/enrolment-status/enrolment-status.module';
import { SendComponent } from './enrolment-default/send/send.component';
// import { SensorsModule } from "@tesla-ce/sensors";

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
        EnrolmentStatusModule,
        NbLayoutModule,
        NbProgressBarModule,
    ],
  declarations: [
    EnrolmentComponent,
    EnrolmentDefaultComponent,
    SendComponent,
  ],
})
export class EnrolmentModule {
}
