import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import {BasicComponent} from './basic/basic.component';
import {BiometricComponent} from './biometric/biometric.component';

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [
    {
      path: 'biometric',
      component: BiometricComponent,
    },
    {
      path: '',
      component: BasicComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
