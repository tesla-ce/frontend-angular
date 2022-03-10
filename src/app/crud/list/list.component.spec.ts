import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EnvService } from '../../@core/env/env.service';
import { ApiServiceTesting } from '../../@core/mock/api.service.mock';
import { ThemeModule } from '../../@theme/theme.module';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let httpMock: HttpTestingController;
  const apiServiceTesting =  new ApiServiceTesting(new EnvService());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{path: 'create', component: ListComponent}]
        ),
        TranslateModule.forRoot(),
        Ng2SmartTableModule,
        ThemeModule,
        NbIconModule,
        NbSelectModule,
        NbFormFieldModule,
        NbInputModule,
        NbButtonModule,
        NbCardModule,
        NbDialogModule,
      ],
      providers: [ 
        EnvService, 
        ThemeModule.forRoot().providers,
      ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.settings = {
      columns: {
        id: {
          title: 'id',
        },
        username: {
          title: 'username',
        },
        email: {
          title: 'email',
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
      addNew: true,
      search: true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init table on changes', () => {
    component.ngOnChanges();
    expect(component).toBeTruthy();
  });

  it('should select a row', () => {
    component.userRowSelect({id:1});
    expect(component).toBeTruthy();
  });

  it('should add new', () => {
    component.create();
    expect(component).toBeTruthy();
  });

  it('should set paging', () => {
    component.endpoint = '/admin/user';
    component.initTable();
    component.perPageOnChange(10);
    expect(component).toBeTruthy();
  });

  it('should refresh', async () => {
    component.endpoint = '/admin/user';
    component.initTable();
    fixture.detectChanges();
    const usersResponse: any = apiServiceTesting.getData('/admin/user?offset=0&limit=10');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user?offset=0&limit=10'));
    getRequest.flush(usersResponse);
    await component.source.getAll().then(data=>{
      fixture.detectChanges();
      component.refresh();
      expect(data).toEqual(usersResponse.results);
    });
  });


  it('should set filter', async () => {
    component.endpoint = '/admin/user';
    component.initTable();
    fixture.detectChanges();
    const usersResponse: any = apiServiceTesting.getData('/admin/user?offset=0&limit=10');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user?offset=0&limit=10'));
    getRequest.flush(usersResponse);
    await component.source.getAll().then(data=>{
      fixture.detectChanges();
      expect(data).toEqual(usersResponse.results);
      component.setFilter([{ field: 'id', search: 1 }], true);
    });
  });

  it('should set sort', async () => {
    component.endpoint = '/admin/user';
    component.initTable();
    fixture.detectChanges();
    const usersResponse: any = apiServiceTesting.getData('/admin/user?offset=0&limit=10');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user?offset=0&limit=10'));
    getRequest.flush(usersResponse);
    await component.source.getAll().then(data=>{
      fixture.detectChanges();
      component.source.setSort([{field: 'id', direction: 'asc', compare: null}]);
      expect(data).toEqual(usersResponse.results);
    });
  });

  it('should change searchInput field', async () => {
    component.endpoint = '/admin/user';
    component.initTable();
    fixture.detectChanges();
    const usersResponse: any = apiServiceTesting.getData('/admin/user?offset=0&limit=10');
    const getRequest = httpMock.expectOne(apiServiceTesting.getUrl('/admin/user?offset=0&limit=10'));
    getRequest.flush(usersResponse);
    await component.source.getAll().then(data=>{
      fixture.detectChanges();
      component.searchInput.nativeElement.value = '1';
      component.searchInput.nativeElement.dispatchEvent(new Event('keyup'));
      expect(data).toEqual(usersResponse.results);
    });
  });
});
