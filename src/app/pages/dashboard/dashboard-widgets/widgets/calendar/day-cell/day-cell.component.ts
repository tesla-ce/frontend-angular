import { Component, HostBinding, HostListener } from '@angular/core';
import { NbCalendarDayCellComponent } from '@nebular/theme';

@Component({
  selector: 'ngx-day-cell',
  templateUrl: 'day-cell.component.html',
  styleUrls: ['day-cell.component.scss'],
  // host: { '(click)': 'onClick()', 'class': 'day-cell' },
})
export class DayCellComponent extends NbCalendarDayCellComponent<Date> {
  
  @HostBinding('class.day-cell')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @HostListener('click') onClick() {}
  instruments = [
  ];
}
