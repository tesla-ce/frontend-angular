import { TestBed } from '@angular/core/testing';

import { AppModule } from './app.module';

describe('AppModule', () => {
   let app: AppModule;

   beforeEach(() => {
     TestBed.configureTestingModule({});
     TestBed.inject(AppModule);
   });
});

