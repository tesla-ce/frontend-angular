import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TestComponent } from './test.component';
import { TestDefaultComponent } from './test-default/test-default.component';

const routes: Routes = [{
  path: '',
  component: TestComponent,
  children: [
    {
      path: '',
      component: TestDefaultComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule {
}
