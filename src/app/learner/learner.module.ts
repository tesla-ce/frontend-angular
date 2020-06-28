import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { LearnerComponent } from './learner.component';
import { LearnerRoutingModule } from './learner-routing.module';

@NgModule({
  imports: [
    LearnerRoutingModule,
    ThemeModule,
    NbMenuModule,
  ],
  declarations: [
    LearnerComponent,
  ],
})
export class LearnerModule {
}
