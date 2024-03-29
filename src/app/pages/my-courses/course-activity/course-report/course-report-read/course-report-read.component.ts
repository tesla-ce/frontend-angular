import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../@core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { formatDate, Location } from '@angular/common';
import { ListCellInstrumentComponent } from '../course-report-list/list-cell-instrument.component';
import { ListSubHeaderComponent } from '../course-report-list/list-sub-header-instrument.component';
import { ListCellSumaryComponent } from '../course-report-list/list-cell-sumary.component';
import { Institution, InstitutionUser } from '../../../../../@core/models/user';
import { ApiReportService } from '../../../../../@core/data/api-report.service';
import { HttpClient } from '@angular/common/http';
import { MATERIAL_TESLA_THEME } from '../../../../../@theme/styles/material/theme.material-tesla';
import { ApiInstitutionService } from '../../../../../@core/data/api-institution.service';
import { NbIconLibraries } from '@nebular/theme';

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
  reports: any[] = [];
  reportChart: any;
  instruments: any;
  loading = true;
  instrumentCharts: any[] = [];
  availableAuditInstruments: string[] = ['fr'];
  settings = {
    addNew: false,
    search: false,
    columns: {
      learner: {
        width: '400px',
        title: this.translate.instant('ENTITIES.REPORT.LEARNER'),
        valuePrepareFunction: (value) => {
          return value.last_name + ', ' + value.first_name;
        },
        filter: false,
      },
      summary: {
        title: this.translate.instant('ENTITIES.REPORT.SUMMARY'),
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
    private apiReportService: ApiReportService,
    private apiInstitutionService: ApiInstitutionService,
    public translate: TranslateService,
    private http: HttpClient,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    iconLibraries: NbIconLibraries,
  ) {
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.activityId = params['activityId'];
      this.reportId = params['reportId'];
    });
    iconLibraries.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
  }

  back() { this.location.back(); }

  audit(instrumentId) {
    this.router.navigate(['audit', instrumentId], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: InstitutionUser) => {
      if (user) {
        this.apiInstitutionService.getInstitutionById(user.institution.id).subscribe((institution: Institution) => {
          if (!institution.allow_learner_audit && user.roles.indexOf('LEARNER') !== -1) this.availableAuditInstruments = [];
            this.apiReportService.getActivityReport(
              user.institution.id, this.courseId, this.activityId, this.reportId).subscribe(report => {
                this.report = report;
                this.reports.push(report);

                this.instruments = report.detail.map(dett => {
                  return {
                    id: dett.instrument_id,
                    name: dett.instrument,
                    acronym: dett.instrument_acronym,
                  };
                });
                this.instruments.map((instrument: any) => {
                  this.settings.columns['instrument-' + instrument.acronym] = {
                    class: 'instrument',
                    title: instrument.name,
                    width: '1400px',
                    type: 'custom',
                    valuePrepareFunction: () => {
                      return instrument;
                    },
                    filter: {
                      type: 'custom',
                      component: ListSubHeaderComponent,
                      data: {instrument : instrument},
                    },
                    renderComponent: ListCellInstrumentComponent,
                  };
                });

                this.report.detail.map(det => {
                this.instrumentCharts[det.instrument_acronym + '_activity_histogram'] =
                  this.getInstrumentChart(det, 'activity_histogram');
                this.instrumentCharts[det.instrument_acronym + '_learner_histogram'] = this.getInstrumentChart(det, 'learner_histogram');
                this.instrumentCharts[det.instrument_acronym + '_positive_facts'] = det.facts.positive;
                this.instrumentCharts[det.instrument_acronym + '_neutral_facts'] = det.facts.neutral;
                this.instrumentCharts[det.instrument_acronym + '_negative_facts'] = det.facts.negative;
              });

              this.http.get<any>(this.report.data).subscribe(res => {
                  const sessionsData = this.getSessionsData(res.sessions);
                  const documentsData = this.getDocumentsData(res.documents);
                  this.reportChart = this.getReportChart(sessionsData, documentsData);
                  this.loading = false;
              });
          });
        });
      }
    });
  }

  getSessionsData(sessions) {
    const sessionsData = {
      sessions: [],
      series: [],
      instruments: this.instruments.map(x => x.acronym),
    };
    sessions.map(session => {
      if (session.data) {
        if (session.data.data && session.data.data !== {} && session.data.instruments.length) {
            session.data.instruments.map(instrumentId => {
              // add serie data
              sessionsData.series.push({
                instrument: this.instruments.find(x => x.id === instrumentId),
                requests: JSON.parse(session.data.data[instrumentId].requests),
              });
            });

            // add session data
            sessionsData.sessions.push(
              {
                createdAt: session.created_at,
                closedAt: session.closed_at,
              },
            );
        }
      }
    });
    return sessionsData;
  }

  getDocumentsData(documents) {
    const documentsData = {
      series: [],
      instruments: this.instruments.map(x => x.acronym),
    };
    documents.map(document => {
      if (document.instruments && document.created_at) {
          document.instruments.map(instrumentId => {
            // add serie data
            if (document.results && document.results[instrumentId].status === 1) {
              documentsData.series.push({
                instrument: this.instruments.find(x => x.id === instrumentId),
                requests: [[document.created_at, document.results[instrumentId].result]],
              });
            }
          });
      }
    });
    return documentsData;
  }

  getReportChart(sessionsData, documentsData) {

    const options: any = {};

    options.xAxis = {
      type: 'time',
      axisLabel: {
        formatter: function(value) {
          return formatDate(value, 'dd/MM/yyyy h:mm', 'en-US');
        },
      },
    };

    options.yAxis = {
      type: 'value',
    };

    options.tooltip = {
      trigger: 'axis',
    };

    options.series = [
    ];

    sessionsData.sessions.map(session => {
      const sessionData = [];
      if (session.createdAt) sessionData.push({xAxis: session.createdAt});
      if (session.closedAt) sessionData.push({xAxis: session.closedAt});
      options.series.push(
        {
            type: 'line',
            markLine: {
              lineStyle: {
                color: '#312683',
                width: 0.5,
                type: 'dotted',
              },
              symbol: ['none', 'none'],
              label: {show: false},
              data: sessionData,
          },
        },
      );
    });

    sessionsData.series.map(serie => {
      if (serie.instrument) {
        options.series.push(
          {
            name: serie.instrument.acronym,
            data: serie.requests,
            type: 'line',
            smooth: true,
          },
        );
      }
    });

    sessionsData.series.map(serie => {
      if (serie.instrument) {
        options.series.push(
          {
            name: serie.instrument.acronym,
            data: serie.requests,
            type: 'line',
            smooth: true,
          },
        );
      }
    });

    documentsData.series.map(serie => {
      options.series.push(
        {
          name: serie.instrument.acronym,
          data: serie.requests,
          type: 'line',
          symbol: 'diamond',
          smooth: true,
        },
      );
    });

    options.legend = {
      data: sessionsData.instruments,
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

    return options;
  }

  getInstrumentChart(detail, type) {
    const chart =  {
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
              data: [],
          },
      ],
      yAxis: [
          {
              type: 'value',
              axisLabel: 'none',
          },
      ],
      series: [
          {
              name: type,
              type: 'bar',
              barGap: '-100%',
              color: MATERIAL_TESLA_THEME.variables.histogram,
              emphasis: {
                  focus: 'series',
              },
              data: detail[type],
          },
          {
              name: type + '_gaussian',
              type: 'bar',
              barGap: '-100%',
              color: MATERIAL_TESLA_THEME.variables.gaussian,
              emphasis: {
                  focus: 'series',
              },
              data: this.getGaussianData(detail[type], detail.result_bean),
          },
          {
            name: type + '_polarity',
            type: 'bar',
            barGap: '-100%',
            color: MATERIAL_TESLA_THEME.variables.polarity,
            emphasis: {
                focus: 'series',
            },
            data: this.getPolarityData(detail[type], detail.instrument_polarity, detail.result_bean),
          },
      ],
    };
    return chart;
  }

  getGaussianData(hist, bean) {
    // Compute the probability to have current value for the learner
    const gaussian = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    gaussian[bean] = hist[bean];
    if (bean > 0) gaussian[bean - 1] = hist[bean - 1] / 2.0;
    if (bean < 9) gaussian[bean + 1] = hist[bean + 1] / 2.0;
    return gaussian;
  }

  getPolarityData(hist, polarity, bean) {
    // Compute polarity chart
    const polarityData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    polarityData.map((item, index) => {
      if ((index > bean && polarity === 1) || (index < bean && polarity === -1)) polarityData[index] = hist[index];
    });
    return polarityData;
  }

}
