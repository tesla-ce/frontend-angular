import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionUserComponent } from './institution-user.component';
import { InstitutionUserShowComponent } from './institution-user-show/institution-user-show.component';
import { InstitutionUserCreateComponent } from './institution-user-create/institution-user-create.component';
import { InstitutionUserUpdateComponent } from './institution-user-update/institution-user-update.component';
import { InstitutionUserListComponent } from './institution-user-list/institution-user-list.component';

const routes: Routes = [{
  path: '',
  component: InstitutionUserComponent,
  children: [
    {
      path: '',
      component: InstitutionUserListComponent,
    },
    {
      path: 'show/:id',
      component: InstitutionUserShowComponent,
    },
    {
      path: 'create',
      component: InstitutionUserCreateComponent,
    },
    {
      path: 'update/:id',
      component: InstitutionUserUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionUserRoutingModule { }
