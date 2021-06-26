import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import { AuthService } from '../../../@core/auth/auth.service';
import { InstitutionUser, User } from '../../../@core/models/user';
import { Router } from '@angular/router';
// import { apiConstants } from '../../../@core/data/api-constants';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  user: User;

  themes = [
    // {
    //   value: 'uoc',
    //   name: 'UOC',
    // },
    // {
    //   value: 'tesla-ce',
    //   name: 'TeSLA-CE',
    // },
    // {
    //   value: 'custom',
    //   name: 'Custom',
    // },
    // {
    //   value: 'default',
    //   name: 'Light',
    // },
    // {
    //   value: 'dark',
    //   name: 'Dark',
    // },
    // {
    //   value: 'cosmic',
    //   name: 'Cosmic',
    // },
    // {
    //   value: 'corporate',
    //   name: 'Corporate',
    // },
    {
      value: 'material-tesla',
      name: 'TeSLA',
    },
    {
      value: 'material-uoc',
      name: 'UOC',
    },
    // {
    //   value: 'material-light',
    //   name: 'Material Light',
    // },
    // {
    //   value: 'material-dark',
    //   name: 'Material Dark',
    // },
  ];

  currentTheme = 'default';

  userMenu = [
    { title: 'Profile' },
    { title: 'Informed Consent' , target: 'ic'},
    { title: 'Log out' }];

  // currentInstitution = this.authService.getInstitution().subscribe(id => id)
  // institutions = this.authService.getUserInstitutions().subscribe(list => list)

  currentInstitution = 1;
  institutions = [{ id: 1, acronym: 'UOC' }];

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));

    // this.authService.getUserInstitutions().subscribe(list => {
    //   this.institutions = list
    // })

    // this.authService.getInstitution().subscribe(id => {
    //   console.log(id)
    //   this.currentInstitution = id
    // })
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.authService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: InstitutionUser) => {
        this.user = user;
        // this.institutions = user?.institution ?? [{
        //   'acronym': 'uoc',
        //   'id': 1,
        //   'isAdmin': false,
        // },
        // {
        //   'acronym': 'test',
        //   'id': 2,
        //   'isAdmin': false,
        // }];

        // apiConstants.institution = this.institutions[0].id;
        // this.currentInstitution = this.institutions[0].id;
        // if (!user?.is_admin) {
        //   // mock institutions
        //   this.institutions = [
        //     {
        //       'acronym': 'uoc',
        //       'id': 1,
        //       'isAdmin': false,
        //     },
        //     {
        //       'acronym': 'test',
        //       'id': 2,
        //       'isAdmin': false,
        //     }];
        // Load institution from user
        // TO DO: this will be an array, delete mocked array, add user.institutions to array or load it from template user?.institutions
        // this.institutions.push(user.institution)
        // this.currentInstitution = user.institution.acronym;

        // }
      });
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });

    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Log out') {
        this.authService.logOut();
        this.menuService.navigateHome();
        return false;
      } else if (event.item.target === 'ic') {
        this.router.navigate(['/learner/ic']);
        return false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeInstitution(id: string) {
    this.authService.setInstitution(id);
    // this.themeService.changeTheme(acronym);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
