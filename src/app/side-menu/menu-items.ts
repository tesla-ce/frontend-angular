import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    // link: '/dashboard',
    // expanded: true,
    home: true,
    children: [{
      title: 'Admin',
      icon: 'award-outline',
      link: '/admin',
    },
    {
      title: 'Instructor',
      icon: 'cube-outline',
      link: '/instructor',
    },
    {
      title: 'Learner',
      icon: 'book-outline',
      link: '/learner',
    }],
  }, {
  title: 'Institution options',
    icon: 'settings-outline',
    // link: '/settings',
    // expanded: true,

    children: [{
      title: 'External IC',
      icon: 'external-link-outline',
      link: '/institution-options/external-ic',
    },
    {
      title: 'Learner auto-create',
      icon: 'activity-outline',
      link: '/institution-options/learner-auto-create',
    },
    {
      title: 'Instructor auto-create',
      icon: 'shake-outline',
      link: '/institution-options/instructor-auto-create',
    }],
  }, {
      title: 'Informed Consent',
      icon: 'monitor-outline',
      link: '/institution/institution-ic',
      // expanded: true,
  }, {
      title: 'SEND',
      icon: 'cube-outline',
      link: '/settings',
  }, {
    title: 'Data',
      icon: 'color-picker-outline',
      // link: '/settings',
      // expanded: true,

      children: [{
        title: 'GDPR actions',
        icon: 'car-outline',
        link: '/instrument',
    }],
  }, {
    title: 'Users',
    icon: 'people-outline',
    link: '/institution/institution-user',
  },
];
