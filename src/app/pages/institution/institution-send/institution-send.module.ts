import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import {

} from '@nebular/theme';

import { InstitutionSendRoutingModule } from './institution-send-routing.module';
import { InstitutionSendCategoryComponent } from './institution-send-category/institution-send-category.component';
import { InstitutionSendUserComponent } from './institution-send-user/institution-send-user.component';
import { InstitutionSendComponent } from './institution-send.component';



@NgModule({
  imports: [
    InstitutionSendRoutingModule,
  ],
  declarations: [

  ],
})
export class InstitutionSendModule {
}
