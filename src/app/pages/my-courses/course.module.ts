import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { JsonFormsModule } from '@jsonforms/angular';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
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

import { CourseComponent } from './course.component';
import { CourseRoutingModule } from './course-routing.module';
import { SideMenuModule } from '../../side-menu/side-menu.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module

import { ListModule } from '../../crud/list/list.module';
import { CreateModule } from '../../crud/create/create.module';
import { CourseReadComponent } from './course-read/course-read.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DataDisplayComponent } from './course-read/control';


@NgModule({
  imports: [
    CourseRoutingModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    NbToggleModule,
    NbFormFieldModule,
    RxReactiveFormsModule,
    NbIconModule,
    ListModule,
    CreateModule,
    CKEditorModule,
    NbTabsetModule,
    PdfViewerModule,
  ],
  declarations: [
    DataDisplayComponent,
    CourseComponent,
    CourseReadComponent,
    CourseListComponent,
  ],
  entryComponents: [DataDisplayComponent],

})
export class CourseModule {
}
