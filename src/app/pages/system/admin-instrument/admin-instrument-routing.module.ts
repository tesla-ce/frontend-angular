import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminInstrumentComponent } from './admin-instrument.component';
import { AdminInstrumentReadComponent } from './admin-instrument-read/admin-instrument-read.component';
import { AdminInstrumentCreateComponent } from './admin-instrument-create/admin-instrument-create.component';
import { AdminInstrumentUpdateComponent } from './admin-instrument-update/admin-instrument-update.component';
import { AdminInstrumentListComponent } from './admin-instrument-list/admin-instrument-list.component';

const routes: Routes = [{
  path: '',
  component: AdminInstrumentComponent,
  children: [
    {
      path: '',
      component: AdminInstrumentListComponent,
    },
    {
      path: 'create',
      component: AdminInstrumentCreateComponent,
    },
    {
      path: ':id/update',
      component: AdminInstrumentUpdateComponent,
    },
    {
      path: ':id',
      component: AdminInstrumentReadComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminInstrumentRoutingModule { }
