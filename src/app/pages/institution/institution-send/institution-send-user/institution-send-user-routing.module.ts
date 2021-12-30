import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionSendUserComponent } from './institution-send-user.component';
import { InstitutionSendUserReadComponent } from './institution-send-user-read/institution-send-user-read.component';
import { InstitutionSendUserUpdateComponent } from './institution-send-user-update/institution-send-user-update.component';
import { InstitutionSendUserListComponent } from './institution-send-user-list/institution-send-user-list.component';

const routes: Routes = [{
  path: '',
  component: InstitutionSendUserComponent,
  children: [
    {
      path: '',
      component: InstitutionSendUserListComponent,
    },
    {
      path: ':id/update',
      component: InstitutionSendUserUpdateComponent,
    },
    {
      path: ':id',
      component: InstitutionSendUserReadComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionSendUserRoutingModule { }
