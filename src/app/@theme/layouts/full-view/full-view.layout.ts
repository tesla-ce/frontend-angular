import { Component } from '@angular/core';

@Component({
  selector: 'ngx-full-view-layout',
  styleUrls: ['./full-view.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-layout-column>
        <ng-content></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class FullViewLayoutComponent {}
