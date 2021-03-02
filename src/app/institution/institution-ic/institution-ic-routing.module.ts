import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionIcComponent } from './institution-ic.component';
import { InstitutionIcShowComponent } from './institution-ic-show/institution-ic-show.component';
import { InstitutionIcCreateComponent } from './institution-ic-create/institution-ic-create.component';
import { InstitutionIcUpdateComponent } from './institution-ic-update/institution-ic-update.component';
import { InstitutionIcListComponent } from './institution-ic-list/institution-ic-list.component';

const routes: Routes = [{
  path: '',
  component: InstitutionIcComponent,
  children: [
    {
      path: '',
      component: InstitutionIcListComponent,
    },
    {
      path: 'show/:id',
      component: InstitutionIcShowComponent,
    },
    {
      path: 'create',
      component: InstitutionIcCreateComponent,
    },
    {
      path: 'update/:id',
      component: InstitutionIcUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionIcRoutingModule { }
