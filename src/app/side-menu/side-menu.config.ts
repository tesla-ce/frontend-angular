import { NbMenuItem } from '@nebular/theme';

export const SideMenuPermissions = {
    'dashboard': true,
    'my-courses': true,
    'test-page': false,
    'administration': true,
    'administration-users': false,
    'administration-ic': true,
    'administration-send': false,
    'administration-courses': false,
    'administration-data-management': false,
    'administration-settings': false,
    'settings': false,
    'statistics': false,
    'monitoring': false,
    'system': true,
    'system-users': true,
    'system-institutions': false,
    'system-instruments': false,
    'system-services': false,
    'system-status': false,
};

export const showAvailableItems = (key: string) => {
    return SideMenuPermissions[key] || false;
};

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        icon: { icon: 'common-dashboard', pack: 'tesla' },
        link: '/dashboard',
        hidden: !showAvailableItems('dashboard'),
    },
    {
        title: 'My Courses',
        icon: { icon: 'common-connection', pack: 'tesla' },
        link: '/course',
        hidden: !showAvailableItems('my-courses'),
    },
    {
        title: 'Test page',
        icon: { icon: 'common-menu_logo', pack: 'tesla' },
        link: '/test',
        hidden: !showAvailableItems('test-page'),
    },
    {
        title: 'Administration',
        icon: { icon: 'common-notifications', pack: 'tesla' },
        link: '/institution',
        hidden: !showAvailableItems('administration'),
        children: [
            {
                title: 'Users',
                icon: { icon: 'instrument-fa', pack: 'tesla' },
                link: '/institution/user',
                hidden: !showAvailableItems('administration-users'),
            },
            {
                title: 'Informed Consent',
                icon: { icon: 'instrument-fr', pack: 'tesla' },
                link: '/institution/ic',
                hidden: !showAvailableItems('administration-ic'),
            },
            {
                title: 'SEND',
                icon: { icon: 'instrument-ks', pack: 'tesla' },
                link: '/institution/send',
                hidden: !showAvailableItems('administration-send'),
            },
            {
                title: 'Courses',
                icon: { icon: 'instrument-plagiarism', pack: 'tesla' },
                link: '/institution/course',
                hidden: !showAvailableItems('administration-courses'),
            },
            {
                title: 'Data Management',
                icon: { icon: 'instrument-vr', pack: 'tesla' },
                link: '/institution/data-management',
                hidden: !showAvailableItems('administration-data-management'),
            },
            {
                title: 'Settings',
                icon: { icon: 'sensor-assessment', pack: 'tesla' },
                link: '/institution/settings',
                hidden: !showAvailableItems('administration-settings'),
            },
        ],
    },
    {
        title: 'Statistics',
        icon: { icon: 'sensor-camera', pack: 'tesla' },
        link: '/statistics',
        hidden: !showAvailableItems('statistics'),
    },
    {
        title: 'Monitoring',
        icon: { icon: 'sensor-keyboard', pack: 'tesla' },
        link: '/monitoring',
        hidden: !showAvailableItems('monitoring'),
    },
    {
        title: 'System',
        icon: { icon: 'sensor-microphone', pack: 'tesla' },
        link: '/system',
        hidden: !showAvailableItems('system'),
        children: [
            {
                title: 'Users',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/admin-user',
                hidden: !showAvailableItems('system-users'),
            },
            {
                title: 'Institutions',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/institution',
                hidden: !showAvailableItems('system-institutions'),
            },
            {
                title: 'Instruments',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/instrument',
                hidden: !showAvailableItems('system-instruments'),
            },
            {
                title: 'Services',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/service',
                hidden: !showAvailableItems('system-services'),
            },
            {
                title: 'Status',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/status',
                hidden: !showAvailableItems('system-status'),
            },
        ],
    },
];
