import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from "./profile-routing.module";
import { BiometricComponent } from './biometric/biometric.component';
import { SharedModule } from '../../shared/shared.module';
import {SideMenuModule} from "../../side-menu/side-menu.module";
import { ThemeModule } from '../../@theme/theme.module';
import { BasicComponent } from './basic/basic.component';
import { EnrolmentStatusModule } from "../../common/enrolment-status/enrolment-status.module";

@NgModule({
  declarations: [ProfileComponent, BiometricComponent, BasicComponent],
  imports: [
    ThemeModule,
    ProfileRoutingModule,
    SharedModule,
    SideMenuModule,
    EnrolmentStatusModule
  ]
})
export class ProfileModule { }
