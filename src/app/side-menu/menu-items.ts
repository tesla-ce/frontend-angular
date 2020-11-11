import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    //link: '/dashboard',
    //expanded: true,
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
    }]
  },{
  title: 'Institution options',
    icon: 'settings-outline',
    //link: '/settings',
    //expanded: true,
  
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
    }]
  },{
      title: 'Informed Consent management',
      icon: 'monitor-outline',
      //link: '/settings',
      //expanded: true,
    
      children: [{
        title: 'Add/Del/Update',
        icon: 'award-outline',
        link: '/informed-consent-management/update',
      },
      {
        title: 'Manage languages',
        icon: 'award-outline',
        link: '/informed-consent-management/update',
      },
      {
        title: 'Manage documents',
        icon: 'radio-button-off-outline',
        link: '/informed-consent-management/update',
      }]
  },{
      title: 'SEND management',
      icon: 'cube-outline',
      link: '/settings',
  },{
    title: 'Data management',
      icon: 'color-picker-outline',
      //link: '/settings',
      //expanded: true,
    
      children: [{
        title: 'GDPR actions',
        icon: 'car-outline',
        link: '/instrument/management',
    }]
  },{
    title: 'Users management',
      icon: 'cube-outline',
      //link: '/settings',
      //expanded: true,
    
      children: [{
        title: 'Roles',
        icon: 'award-outline',
        link: '/user-management/roles',
      }]
  },
];