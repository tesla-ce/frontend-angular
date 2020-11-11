import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [
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
      icon: 'edit-2-outline',
      link: '/instructor',
    },
    {
      title: 'Learner',
      icon: 'book-outline',
      link: '/learner',
    }]
  },{
  title: 'System configuration',
    icon: 'settings-outline',
    //link: '/settings',
    //expanded: true,
  
    children: [{
      title: 'Update',
      icon: 'flip-2-outline',
      link: '/settings/update',
    },
    {
      title: 'Workers frequencies',
      icon: 'activity-outline',
      link: '/settings/workers-frequencies',
    },
    {
      title: 'Sensors parameters',
      icon: 'shake-outline',
      link: '/settings/sensors-parameters',
    },
    {
      title: 'System scaling',
      icon: 'paper-plane-outline',
      link: '/settings/system-scaling',
    },
    ]
  },{
      title: 'Monitoring',
      icon: 'monitor-outline',
      //link: '/settings',
      //expanded: true,
    
      children: [{
        title: 'External Services',
        icon: 'external-link-outline',
        //link: '/settings',
        //expanded: true,
      
        children: [{
          title: 'Database',
          icon: 'layers-outline',
          link: '/monitoring/external-services/database',
        },
        {
          title: 'Storage',
          icon: 'award-outline',
          link: '/monitoring/external-services/storage',
        },
        {
          title: 'Vault',
          icon: 'radio-button-off-outline',
          link: '/monitoring/external-services/vault',
        },]
      },{
        title: 'System status',
        icon: 'loader-outline',
        //link: '/settings',
        //expanded: true,
      
        children: [{
          title: 'Docker status',
          icon: 'grid-outline',
          link: '/monitoring/status/docker',
        },
        {
          title: 'Load levels',
          icon: 'bar-chart-outline',
          link: '/monitoring/status/storage',
        }]
      },{
      title: 'Learners',
      icon: 'book-outline',
      link: '/monitoring/docker',
      },{
      title: 'Activities',
      icon: 'star-outline',
      link: '/monitoring/activities',
    }]
  },{
    title: 'Institutions',
      icon: 'cube-outline',
      //link: '/settings',
      //expanded: true,
    
      children: [{
        title: 'Add/Del/Update',
        icon: 'award-outline',
        link: '/institutions/update',
      },
      {
        title: 'Statistics',
        icon: 'pie-chart-outline',
        link: '/institutions/statistics',
      }]
  },{
    title: 'Instrument',
      icon: 'color-picker-outline',
      //link: '/settings',
      //expanded: true,
    
      children: [{
        title: 'Management',
        icon: 'settings-outline',
        link: '/instrument/management',
      },
      {
        title: 'Providers',
        icon: 'car-outline',
        children: [{
          title: 'Management',
          icon: 'settings-outline',
          link: '/instrument/providers/management',
        },{
          title: 'Options',
          icon: 'options-outline',
          link: '/instrument/providers/options',
        }]
    }],
  },{
    title: 'User management',
      icon: 'people-outline',
      //link: '/settings',
      //expanded: true,
    
      children: [{
        title: 'Admins',
        icon: 'award-outline',
        link: '/user-management/admins',
      },
      {
        title: 'Institutions',
        icon: 'cube-outline',
        link: '/user-management/institutuions',
      }]
  },
];