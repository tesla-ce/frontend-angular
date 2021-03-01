import { SelectRemoteComponent } from './select-remote.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAutocompleteModule } from '@nebular/theme';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbAutocompleteModule
  ],
  exports: [SelectRemoteComponent]
})
export class SelectRemoteModule { }
