import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionSendCategoryComponent } from './institution-send-category.component';
import { InstitutionSendCategoryReadComponent } from './institution-send-category-read/institution-send-category-read.component';
import { InstitutionSendCategoryCreateComponent } from './institution-send-category-create/institution-send-category-create.component';
import { InstitutionSendCategoryUpdateComponent } from './institution-send-category-update/institution-send-category-update.component';
import { InstitutionSendCategoryListComponent } from './institution-send-category-list/institution-send-category-list.component';

const routes: Routes = [{
  path: '',
  component: InstitutionSendCategoryComponent,
  children: [
    {
      path: '',
      component: InstitutionSendCategoryListComponent,
    },
    {
      path: 'create',
      component: InstitutionSendCategoryCreateComponent,
    },
    {
      path: ':id/update',
      component: InstitutionSendCategoryUpdateComponent,
    },
    {
      path: ':id',
      component: InstitutionSendCategoryReadComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionSendCategoryRoutingModule { }
