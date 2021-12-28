import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChildren} from '@angular/core';
import { EChartsOption } from 'echarts';
// import {echarts} from "../../../typings";

@Component({
  selector: 'ngx-enrolment-status',
  templateUrl: './enrolment-status.component.html',
  styleUrls: ['./enrolment-status.component.scss'],
})
export class EnrolmentStatusComponent implements AfterViewInit, OnChanges {
  @ViewChildren('gaucheEcharts') gEcharts;
  @Input() enrolment = 0;
  @Input() analyzing = 0;

  @Input() instrument: string;
  options: EChartsOption;
  echartsInstance = null;
  ready = false;

  constructor() {
    this.options = {
      tooltip: {
        formatter: this.instrument + '<br/>{b} : {c}%',
      },
      color: ['#25a148', '#5290e9'],
      series: [{
        type: 'gauge',
        startAngle: 225,
        endAngle: -405,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#464646',
          },
        },
        axisLine: {
          lineStyle: {
            width: 40,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: [{
          value: this.enrolment * 100,
          name: 'Enrolment',
          title: {
            offsetCenter: ['0%', '-35%'],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-20%'],
          },
        },
          {
            value: this.analyzing * 100,
            name: 'Analyzing',
            title: {
              offsetCenter: ['0%', '-4%'],
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', '10%'],
            },
          },
        ],
        title: {
          fontSize: 14,
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: 'auto',
          borderColor: 'auto',
          borderRadius: 20,
          borderWidth: 1,
          formatter: '{value}%',
        },
      }],
    };
  }

  ngAfterViewInit() {
    this.ready = true;
    // this.echartsInstance = echarts.init(this.gEcharts.first.nativeElement);
  }
  onChartInit(ec) {
    this.echartsInstance = ec;
    this.update();
  }
  update() {
    if (this.ready === true) {
      this.echartsInstance.setOption(this.options);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let changes_detected = false;
    if (changes.enrolment !== undefined && changes.enrolment.currentValue) {
      this.enrolment = changes.enrolment.currentValue * 100;
      this.options.series[0].data[0].value = this.enrolment;
      changes_detected = true;
    }

    if (changes.analyzing !== undefined && changes.analyzing.currentValue) {
      this.analyzing = changes.analyzing.currentValue * 100;
      this.options.series[0].data[1].value = this.analyzing;
      changes_detected = true;
    }

    if (changes.instrument !== undefined && changes.instrument.currentValue) {
      this.instrument = changes.instrument.currentValue;
      this.options.tooltip = {formatter: this.instrument + '<br/>{b} : {c}%'};
      changes_detected = true;
    }

    if (changes_detected === true) {
      this.update();
    }

  }
}
