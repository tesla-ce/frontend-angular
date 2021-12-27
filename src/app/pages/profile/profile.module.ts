import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { BiometricComponent } from './biometric/biometric.component';
import { SharedModule } from '../../shared/shared.module';
import {SideMenuModule} from '../../side-menu/side-menu.module';
import { ThemeModule } from '../../@theme/theme.module';
import { BasicComponent } from './basic/basic.component';
import { EnrolmentStatusModule } from '../../common/enrolment-status/enrolment-status.module';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbSelectModule } from '@nebular/theme';
import { CreateModule } from '../../crud/create/create.module';

@NgModule({
  declarations: [ProfileComponent, BiometricComponent, BasicComponent],
  imports: [
    ThemeModule,
    ProfileRoutingModule,
    SharedModule,
    SideMenuModule,
    EnrolmentStatusModule,
    NbCheckboxModule,
    NbSelectModule,
    NbCardModule,
    NbButtonModule,
    CreateModule,
  ],
})
export class ProfileModule { }
