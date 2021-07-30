import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListCellActionsComponent } from '../../../../../crud/list/list-cell-actions.component';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { formatDate, Location } from '@angular/common';
import { ListCellInstrumentComponent } from '../course-report-list/list-cell-instrument.component';
import { ListSubHeaderComponent } from '../course-report-list/list-sub-header-instrument.component';
import { ApiCourseService } from '../../../../../@core/data/api-course.service';
import { ListCellSumaryComponent } from '../course-report-list/list-cell-sumary.component';
import { InstitutionUser } from '../../../../../@core/models/user';
import { ApiReportService } from '../../../../../@core/data/api-report.service';
import { HttpClient } from '@angular/common/http';

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
  endpoint: string;
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
    private http: HttpClient,
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

  audit() {
    this.router.navigate(['audit'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.endpoint =
         `/institution/${user.institution.id}/course/${this.courseId}/activity/${this.activityId}/report?id=${this.reportId}`;
        this.apiCourseService.getAllInstruments(user.institution.id).subscribe((instruments: any[]) => {
          instruments.map((instrument: any) => {
            this.settings.columns['instrument-' + instrument.acronym] = {
              // title: '<nb-icon icon="instrument-' + instrument.acronym + '" pack="tesla"></nb-icon> ' + instrument.acronym,
              class: 'instrument',
              title: instrument.name,
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
            this.apiReportService.getActivityReport(
              user.institution.id, this.courseId, this.activityId, this.reportId).subscribe(report => {
              this.report = report;
              this.report.detail.map(det => {
                this.instrumentCharts[det.instrument_acronym + '_activity_histogram'] = this.getInstrumentChart(det, 'activity_histogram');
                this.instrumentCharts[det.instrument_acronym + '_learner_histogram'] = this.getInstrumentChart(det, 'learner_histogram');
                this.instrumentCharts[det.instrument_acronym + '_positive_facts'] = det.facts.positive;
                this.instrumentCharts[det.instrument_acronym + '_neutral_facts'] = det.facts.neutral;
                this.instrumentCharts[det.instrument_acronym + '_negative_facts'] = det.facts.negative;
              });

              this.http.get<any>(this.report.data).subscribe(res => {
                  // console.log(res);
                  this.reportChart = this.getReportChart();
                  this.loading = false;
              });

              // this.apiReportService.getActivityReportChart(user.institution.id,
              //   this.courseId, this.activityId, this.reportId).subscribe(reportChart => {
              //   this.reportChart = this.getReportChart();
              //   this.loading = false;
              // });
            });
          });
        });
      }
    });
  }

  getReportChart() {
    const options: any = {};

    options.xAxis = {
        type: 'time',
        boundaryGap: false,
        axisLabel: {
            formatter: function(value) {
              return formatDate(value, 'dd/MM/yyyy', 'en-US');
            },
        },
    };

    options.yAxis = {
        type: 'value',
        boundaryGap: [0, '30%'],
    };

    options.toolbox = {
      show: true,
      feature: {
          dataZoom: {
              yAxisIndex: 'none',
              title: '',
          },
      },
    };

    options.tooltip = {
      trigger: 'axis',
    };

    options.visualMap = {
      type: 'piecewise',
      show: false,
      dimension: 0,
    };

    options.series = [];

    const serieData = [
      ['2021-07-16T09:21:11.546Z', null],
      ['2021-07-16T09:21:11.546Z', 0.9752936662717850],
      ['2021-07-16T09:21:11.590Z', 0.9135100193937418],
      ['2021-07-16T09:21:11.622Z', 0.9672791296615830],
      ['2021-07-16T09:21:11.659Z', 0.9097466227868173],
      ['2021-07-16T09:21:11.692Z', 0.9838387250892472],
      ['2021-07-16T09:21:11.721Z', 0.9447166858037267],
      ['2021-07-16T09:21:11.751Z', 0.9118105711305643],
      ['2021-07-16T09:21:11.777Z', 0.9344169324066872],
      ['2021-07-16T09:21:11.806Z', 0.9974212952306971],
      ['2021-07-16T09:21:11.836Z', 0.9846688400960376],
      ['2021-07-16T09:21:11.836Z', null],
    ];

    const serie = {
        type: 'line',
        smooth: 0.6,
        symbol: 'emptyCircle',
        showSymbol: true,
        symbolSize: 10,
        showAllSymbol: true,
        lineStyle: {
            color: '#5470C6',
            width: 2,
        },
        markLine: {
            symbol: ['none', 'none'],
            label: {show: false},
            data: [
                {xAxis: serieData[0][0]},
                {xAxis: serieData[serieData.length - 1][0]},
            ],
        },
        areaStyle: {},
        data: serieData,
    };

    options.series.push(serie);

    const serieData1 = [
      ['2021-07-16T09:21:12.546Z', null],
      ['2021-07-16T09:21:12.546Z', 0.4752936662717850],
      ['2021-07-16T09:21:12.590Z', 0.4135100193937418],
      ['2021-07-16T09:21:12.622Z', 0.5672791296615830],
      ['2021-07-16T09:21:12.659Z', 0.6097466227868173],
      ['2021-07-16T09:21:12.692Z', 0.7838387250892472],
      ['2021-07-16T09:21:12.721Z', 0.8447166858037267],
      ['2021-07-16T09:21:12.751Z', 0.3118105711305643],
      ['2021-07-16T09:21:12.777Z', 0.4344169324066872],
      ['2021-07-16T09:21:12.806Z', 0.3974212952306971],
      ['2021-07-16T09:21:12.836Z', 0.4846688400960376],
      ['2021-07-16T09:21:12.836Z', null],
    ];

    const serie1 = {
        type: 'line',
        smooth: 0.6,
        symbol: 'emptyCircle',
        showSymbol: true,
        symbolSize: 10,
        showAllSymbol: true,
        lineStyle: {
            color: '#5470C6',
            width: 2,
        },
        markLine: {
            symbol: ['none', 'none'],
            label: {show: false},
            data: [
                {xAxis: serieData1[0][0]},
                {xAxis: serieData1[serieData1.length - 1][0]},
            ],
        },
        areaStyle: {},
        data: serieData1,
    };

    options.series.push(serie1);

    return options;
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
              color: 'purple',
              emphasis: {
                  focus: 'series',
              },
              data: detail.activity_histogram,
          },
          {
            name: 'activity histogram',
            type: 'bar',
            stack: 'stack',
            color: 'red',
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
