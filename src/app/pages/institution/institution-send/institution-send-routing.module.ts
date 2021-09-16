import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionSendComponent } from './institution-send.component';

const routes: Routes = [{
  path: '',
  component: InstitutionSendComponent,
  children: [
    {
      path: 'category',
      loadChildren: () => import('./institution-send-category/institution-send-category.module')
        .then(m => m.InstitutionSendCategoryModule),
    },
    {
      path: 'user',
      loadChildren: () => import('./institution-send-user/institution-send-user.module')
        .then(m => m.InstitutionSendUserModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionSendRoutingModule { }
