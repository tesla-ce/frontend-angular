import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListCellActionsComponent } from '../../../../../crud/list/list-cell-actions.component';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ListCellInstrumentComponent } from '../course-report-list/list-cell-instrument.component';
import { ListSubHeaderComponent } from '../course-report-list/list-sub-header-instrument.component';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ListCellSumaryComponent } from '../course-report-list/list-cell-sumary.component';
import { InstitutionUser } from '../../../../../@core/models/user';
import { ApiReportService } from '../../../../../@core/data/api-report.service';

@Component({
  selector: 'ngx-course-report-read',
  templateUrl: './course-report-read.component.html',
  styleUrls: ['./course-report-read.component.scss'],
})
export class CourseReportReadComponent implements OnInit {
  courseId: number;
  activityId: number;
  reportId: number;
  report: any;
  reportChart: any;
  endPoint: string;
  loading: boolean = true;
  instrumentCharts: any[] = [];
  settings = {
    addNew: false,
    search: false,
    columns: {
      learner: {
        width: '400px',
        title: 'Learner',
        valuePrepareFunction: (value) => {
          return value.last_name + ', ' + value.first_name;
        },
        filter: false,
      },
      summary: {
        title: 'Summary',
        filter: false,
        type: 'custom',
        renderComponent: ListCellSumaryComponent,
      },

    },
    actions: {
      edit: false,
      add: false,
      delete: false,
    },
    mode: 'external',
    pager: {
      display: true,
      perPage: 10,
    },
    showFooter: false,
  };

  constructor(
    private authService: AuthService,
    private apiCourseService: ApiCourseService,
    private apiReportService: ApiReportService,
    public translate: TranslateService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.activityId = params['activityId'];
      this.reportId = params['reportId'];
    });
  }

  back() { this.location.back(); }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      this.endPoint = `/institution/1/course/${this.courseId}/activity/${this.activityId}/report?id=${this.reportId}`;
      this.apiCourseService.getAllInstruments().subscribe((instruments: any[]) => {
        instruments.map((instrument: any) => {
          this.settings.columns['instrument-' + instrument.acronym] = {
            // title: '<nb-icon icon="instrument-' + instrument.acronym + '" pack="tesla"></nb-icon> ' + instrument.acronym,
            class: 'instrument',
            title: instrument.acronym,
            width: '1400px',
            type: 'custom',
            valuePrepareFunction: (value) => {
              return instrument;
            },
            filter: {
              type: 'custom',
              component: ListSubHeaderComponent,
              data: {instrument : instrument},
            },
            renderComponent: ListCellInstrumentComponent,
          };
          this.apiReportService.getActivityReport(this.courseId, this.activityId, this.reportId).subscribe(report => {
            this.report = report;
            this.report.detail.map(det => {
              this.instrumentCharts[det.instrument_acronym + '_activity_histogram'] = this.getInstrumentChart(det, 'activity_histogram');
              this.instrumentCharts[det.instrument_acronym + '_learner_histogram'] = this.getInstrumentChart(det, 'learner_histogram');
            });

            this.apiReportService.getActivityReportChart(this.courseId, this.activityId, this.reportId).subscribe(reportChart => {
              console.log(reportChart);
              this.reportChart = this.getReportChart();
              this.loading = false;
            });
          });
        });
      });
    });
  }

  getReportChart() {

    return {
      xAxis: {
          type: 'category',
          boundaryGap: false,
      },
      yAxis: {
          type: 'value',
          boundaryGap: [0, '30%'],
      },
      visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [
            {
              gt: 0,
              lt: 10,
              color: 'rgba(0, 0, 0, 0)',
          },
          // {
          //     gt: 5,
          //     lt: 7,
          //     //color: 'rgba(0, 0, 180, 0.4)',
          // }
        ],
      },
      series: [
          {
              type: 'line',
              smooth: 0.6,
              symbol: 'none',
              lineStyle: {
                  color: '#5470C6',
                  width: 1,
              },
              markLine: {
                  symbol: ['none', 'none'],
                  label: {show: false},
                  data: [
                      {xAxis: 0},
                      // {xAxis: 3},
                      // {xAxis: 5},
                      {xAxis: 10},
                  ],
              },
              areaStyle: {},
              data: [["2021-07-16T09:21:11.546Z", 0.975293666271785], ["2021-07-16T09:21:11.590Z", 0.9135100193937418], ["2021-07-16T09:21:11.622Z", 0.967279129661583], ["2021-07-16T09:21:11.659Z", 0.9097466227868173], ["2021-07-16T09:21:11.692Z", 0.9838387250892472], ["2021-07-16T09:21:11.721Z", 0.9447166858037267], ["2021-07-16T09:21:11.751Z", 0.9118105711305643], ["2021-07-16T09:21:11.777Z", 0.9344169324066872], ["2021-07-16T09:21:11.806Z", 0.9974212952306971], ["2021-07-16T09:21:11.836Z", 0.9846688400960376], ["2021-07-16T09:21:15.697Z", 0.09534410170326006]],
          },
        ],
  };
  }

  getReportMockData() {
    return {'data': {
        'sessions': [
          {
              'id': 36,
              'pending_requests': 0,
              'valid_requests': 11,
              'processed_requests': 0,
              'total_requests': 11,
              'created_at': '2021-07-16T09:21:45.478529+00:00',
              'closed_at': null,
              'identity_level': 0,
              'integrity_level': 0,
              'content_level': 0,
              'data': {
                'instruments': [
                    2,
                    5,
                ],
                'alerts': '[]',
                'data': {
                    '2': {
                      'total': 10,
                      'valid': 10,
                      'confidence': 1.0,
                      'result': 0.9522702487870888,
                      'code': 2,
                      'requests': '[["2021-07-16T09:21:11.546Z", 0.975293666271785], ["2021-07-16T09:21:11.590Z", 0.9135100193937418], ["2021-07-16T09:21:11.622Z", 0.967279129661583], ["2021-07-16T09:21:11.659Z", 0.9097466227868173], ["2021-07-16T09:21:11.692Z", 0.9838387250892472], ["2021-07-16T09:21:11.721Z", 0.9447166858037267], ["2021-07-16T09:21:11.751Z", 0.9118105711305643], ["2021-07-16T09:21:11.777Z", 0.9344169324066872], ["2021-07-16T09:21:11.806Z", 0.9974212952306971], ["2021-07-16T09:21:11.836Z", 0.9846688400960376], ["2021-07-16T09:21:15.697Z", 0.09534410170326006]]',
                    },
                    '5': {
                      'total': 1,
                      'valid': 1,
                      'confidence': 1.0,
                      'result': 0.09534410170326006,
                      'code': 2,
                      'requests': '[["2021-07-16T09:21:11.546Z", 0.975293666271785], ["2021-07-16T09:21:11.590Z", 0.9135100193937418], ["2021-07-16T09:21:11.622Z", 0.967279129661583], ["2021-07-16T09:21:11.659Z", 0.9097466227868173], ["2021-07-16T09:21:11.692Z", 0.9838387250892472], ["2021-07-16T09:21:11.721Z", 0.9447166858037267], ["2021-07-16T09:21:11.751Z", 0.9118105711305643], ["2021-07-16T09:21:11.777Z", 0.9344169324066872], ["2021-07-16T09:21:11.806Z", 0.9974212952306971], ["2021-07-16T09:21:11.836Z", 0.9846688400960376], ["2021-07-16T09:21:15.697Z", 0.09534410170326006]]',
                    },
                },
              },
          },
        ],
        'facts': [ ],
      },
    };
  }

  getInstrumentChart(detail, type) {

    return {
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow',
          },
      },
      // legend: {
      //     data: ['gaussian', type],
      // },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
      },
      xAxis: [
          {
              type: 'category',
              data: [], // xAxis items
          },
      ],
      yAxis: [
          {
              type: 'value',
          },
      ],
      series: [
          {
              name: 'gaussian',
              type: 'bar',
              stack: 'stack',
              color: 'green',
              emphasis: {
                  focus: 'series',
              },
              data: this.getGaussianData(detail[type], detail.result_bean),
          },
          {
              name: 'activity histogram',
              type: 'bar',
              stack: 'stack',
              color: 'red',
              emphasis: {
                  focus: 'series',
              },
              data: detail.activity_histogram,
          },
          {
            name: 'activity histogram',
            type: 'bar',
            stack: 'stack',
            color: 'purple',
            emphasis: {
                focus: 'series',
            },
            data: this.getPolarityData(detail[type], detail.instrument_polarity),
        },
      ],
    };
  }

  getGaussianData(hist, bean) {
    // Compute the probability to have current value for the learner
    const gaussian = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    gaussian[bean] = hist[bean];
    if (bean > 0) gaussian[bean - 1] = hist[bean - 1] / 2.0;
    if (bean < 9) gaussian[bean + 1] = hist[bean + 1] / 2.0;
    return gaussian;
  }

  getPolarityData(hist, polarity) {
    console.log(polarity);
    // Compute polarity chart
    let polarityData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (polarity === 1) {
        polarityData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 3];
    } else {
        polarityData = [3, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    return polarityData;
  }

}
