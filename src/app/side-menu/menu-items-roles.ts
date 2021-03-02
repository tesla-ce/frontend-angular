import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_ROLES: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'Dashboard',
    link: '/dashboard',
  },
  {
      title: 'My Courses',
      icon: 'My Courses',
      link: '/my-courses',
  },
  {
      title: 'Test page',
      icon: 'Test page',
      link: '/test-page',
  },
  {
      title: 'Administration',
      icon: 'Administration',
      link: '/administration',
      children: [
          {
              title: 'Users',
              icon: 'Users',
              link: '/administration/users',
          },
          {
              title: 'Informed Consent',
              icon: 'Informed Consent',
              link: '/administration/informed-consent',
          },
          {
              title: 'SEND',
              icon: 'SEND',
              link: '/administration/send',
          },
          {
              title: 'Courses',
              icon: 'Courses',
              link: '/administration/courses',
          },
          {
              title: 'Data Management',
              icon: 'Data Management',
              link: '/administration/data-management',
          },
          {
              title: 'Settings',
              icon: 'Settings',
              link: '/administration/settings',
          },
      ],
  },
  {
      title: 'Statistics',
      icon: 'Statistics',
      link: '/statistics',
  },
  {
      title: 'Monitoring',
      icon: 'Monitoring',
      link: '/monitoring',
  },
  {
    title: 'System',
    icon: 'System',
    link: '/system',
    children: [
        {
            title: 'Users',
            icon: 'Users',
            link: '/system/users',
        },
        {
            title: 'Institutions',
            icon: 'Institutions',
            link: '/system/institutions',
        },
        {
            title: 'Instruments',
            icon: 'Instruments',
            link: '/system/instruments',
        },
        {
            title: 'Services',
            icon: 'Services',
            link: '/system/services',
        },
        {
            title: 'Status',
            icon: 'Status',
            link: '/system/status',
        },
    ],
  },
];
