import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbFormFieldModule,
  NbTabsetModule,
  NbToggleModule
} from '@nebular/theme';

import { InstitutionCourseComponent } from './institution-course.component';
import { InstitutionCourseRoutingModule } from './institution-course-routing.module';
import { SideMenuModule } from '../../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module

import { ListModule } from '../../../crud/list/list.module';
import { CreateModule } from '../../../crud/create/create.module';
import { InstitutionCourseReadComponent } from './institution-course-read/institution-course-read.component';
import { InstitutionCourseListComponent } from './institution-course-list/institution-course-list.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  imports: [
    InstitutionCourseRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbToggleModule,
    NbFormFieldModule,
    RxReactiveFormsModule,
    NbIconModule,
    ListModule,
    CreateModule,
    CKEditorModule,
    NbTabsetModule,
    PdfViewerModule
  ],
  declarations: [
    InstitutionCourseComponent,
    InstitutionCourseReadComponent,
    InstitutionCourseListComponent,
  ],
})
export class InstitutionCourseModule {
}
