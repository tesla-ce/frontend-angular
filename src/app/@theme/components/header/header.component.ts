import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import { AuthService } from '../../../@core/auth/auth.service';
import { Institution, InstitutionUser} from '../../../@core/models/user';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

// import { apiConstants } from '../../../@core/data/api-constants';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly = false;
  user: InstitutionUser;
  defaultPicture = '/ui/assets/images/avatar-placeholder.png';

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

  currentTheme = 'material-tesla';

  userMenu = [];

  // currentInstitution = this.authService.getInstitution().subscribe(id => id)
  // institutions = this.authService.getUserInstitutions().subscribe(list => list)

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private translateService: TranslateService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));
  }

  ngOnInit() {
    this.userMenu.push({ title: this.translateService.instant("TOP_MENU.PROFILE"), target: 'profile' });
    this.userMenu.push({ title: this.translateService.instant("TOP_MENU.BIOMETRIC"), target: 'biometric' });
    this.userMenu.push({ title: this.translateService.instant("TOP_MENU.INFORMED_CONSENT"), target: 'ic' });
    this.userMenu.push({ title: this.translateService.instant("TOP_MENU.LOG_OUT"), target: 'logout' });

    this.currentTheme = this.themeService.currentTheme;
    this.authService.getUser()
      // .pipe(takeUntil(this.destroy$))
      .subscribe((user: InstitutionUser) => {
        if (!user) return;
        this.user = user;
        this.changeInstitutionTheme(user?.institution?.acronym);
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

      if (event.item.target === 'logout') {
        this.authService.logOut();
        this.menuService.navigateHome();
        return false;
      } else if (event.item.target === 'ic') {
        this.router.navigate(['/learner/ic']);
        return false;
      } else if (event.item.target === 'profile') {
        this.router.navigate(['/profile']);
        return false;
      } else if (event.item.target === 'biometric') {
        this.router.navigate(['/profile/biometric']);
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

  changeInstitution(institution: Institution) {
    this.authService.setInstitution(institution.id.toString());
    this.changeInstitutionTheme(institution.acronym);
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

  changeInstitutionTheme(institutionAcronym){
    const availableThemes = this.themes.map(item => item.value);
    let institutionThemeName = 'material-' + institutionAcronym;
    let fallbackThemeName = 'material-tesla';

    if (localStorage.getItem('high_contrast') === 'true'){
      fallbackThemeName += '-high_contrast';
      institutionThemeName += '-high_contrast';
    }

    if (localStorage.getItem('big_fonts') === 'true'){
      fallbackThemeName += '-big_fonts';
      institutionThemeName += '-big_fonts';
    } 

    if (availableThemes.indexOf(institutionThemeName) !== -1) this.themeService.changeTheme(institutionThemeName);
    else this.themeService.changeTheme(fallbackThemeName);
  }
}
