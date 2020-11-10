import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { LearnerComponent } from './learner.component';
import { LearnerRoutingModule } from './learner-routing.module';
import { SideMenuModule } from '../side-menu/side-menu.module';

@NgModule({
  imports: [
    LearnerRoutingModule,
    ThemeModule,
    SideMenuModule
  ],
  declarations: [
    LearnerComponent
  ],
})
export class LearnerModule {
}
