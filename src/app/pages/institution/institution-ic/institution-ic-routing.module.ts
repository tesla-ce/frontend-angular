import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionIcComponent } from './institution-ic.component';
import { InstitutionIcReadComponent } from './institution-ic-read/institution-ic-read.component';
import { InstitutionIcCreateComponent } from './institution-ic-create/institution-ic-create.component';
import { InstitutionIcUpdateComponent } from './institution-ic-update/institution-ic-update.component';
import { InstitutionIcListComponent } from './institution-ic-list/institution-ic-list.component';
import { InstitutionIcIframeComponent } from './institution-ic-iframe/institution-ic-iframe.component';

const routes: Routes = [{
  path: '',
  component: InstitutionIcComponent,
  children: [
    {
      path: '',
      component: InstitutionIcListComponent,
    },
    {
      path: ':id',
      component: InstitutionIcReadComponent,
    },
    {
      path: 'create',
      component: InstitutionIcCreateComponent,
    },
    {
      path: ':id/update',
      component: InstitutionIcUpdateComponent,
    },
    // {
    //   path: 'iframe/:id',
    //   component: InstitutionIcIframeComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionIcRoutingModule { }
