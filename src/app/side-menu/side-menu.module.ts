import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu.component';
import { NbMenuModule } from '@nebular/theme';

@NgModule({
  declarations: [
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    NbMenuModule,
  ],
  exports: [
    SideMenuComponent,
  ],
})
export class SideMenuModule { }
