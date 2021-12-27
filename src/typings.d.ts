/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/* SystemJS module definition */
import {ECharts} from "echarts";

declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var tinymce: any;

declare var echarts: ECharts;
