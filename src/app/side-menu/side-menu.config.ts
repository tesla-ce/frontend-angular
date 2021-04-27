import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        icon: { icon: 'common-dashboard', pack: 'tesla' },
        link: '/dashboard',
    },
    {
        title: 'My Courses',
        icon: { icon: 'common-connection', pack: 'tesla' },
        link: '/course',
    },
    {
        title: 'Test page',
        icon: { icon: 'common-menu_logo', pack: 'tesla' },
        link: '/test-page',
    },
    {
        title: 'Administration',
        icon: { icon: 'common-notifications', pack: 'tesla' },
        link: '/institution',
        children: [
            {
                title: 'Users',
                icon: { icon: 'instrument-fa', pack: 'tesla' },
                link: '/institution/users',
            },
            {
                title: 'Informed Consent',
                icon: { icon: 'instrument-fr', pack: 'tesla' },
                link: '/institution/institution-ic',
            },
            {
                title: 'SEND',
                icon: { icon: 'instrument-ks', pack: 'tesla' },
                link: '/institution/send',
            },
            {
                title: 'Courses',
                icon: { icon: 'instrument-plagiarism', pack: 'tesla' },
                link: '/institution/course',
            },
            {
                title: 'Data Management',
                icon: { icon: 'instrument-vr', pack: 'tesla' },
                link: '/institution/data-management',
            },
            {
                title: 'Settings',
                icon: { icon: 'sensor-assessment', pack: 'tesla' },
                link: '/institution/settings',
            },
        ],
    },
    {
        title: 'Statistics',
        icon: { icon: 'sensor-camera', pack: 'tesla' },
        link: '/statistics',
    },
    {
        title: 'Monitoring',
        icon: { icon: 'sensor-keyboard', pack: 'tesla' },
        link: '/monitoring',
    },
    {
        title: 'System',
        icon: { icon: 'sensor-microphone', pack: 'tesla' },
        link: '/system',
        children: [
            {
                title: 'Users',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/admin-user',
            },
            {
                title: 'Institutions',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/institutions',
            },
            {
                title: 'Instruments',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/instruments',
            },
            {
                title: 'Services',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/services',
            },
            {
                title: 'Status',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/status',
            },
        ],
    },
];

export const SideMenuPermissions = {
    'dashboard': [],
    'my-courses': [],
    'test-page': [],
    'administration': {
        'dashboard': [],
        'users': [],
        'informed-consent': [],
        'send': [],
        'courses': [],
        'data-management': [],
    },
    'settings': [],
    'statistics': [],
    'monitoring': [],
    'system': {
        'dashboard': [],
        'users': [],
        'institutions': [],
        'instruments': [],
        'services': [],
        'status': [],
    },
};
