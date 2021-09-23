import {GridsterItem} from 'angular-gridster2';

export interface Dashboard {
  id?: string;
  name?: string;
  widgets?: Array<GridsterItem>;
}
