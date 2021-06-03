import { NbMenuItem } from '@nebular/theme';

export const SideMenuPermissions = {
    'dashboard': true,
    'my-courses': true,
    'test-page': true,
    'administration': true,
    'administration-users': true,
    'administration-informed-consent': true,
    'administration-send': true,
    'administration-courses': true,
    'administration-data-management': true,
    'administration-settings': true,
    'settings': true,
    'statistics': true,
    'monitoring': true,
    'system': true,
    'system-users': true,
    'system-institutions': true,
    'system-instruments': true,
    'system-services': true,
    'system-status': true,
};

export const hideUnavailableItems = (key: string) => {
    return !SideMenuPermissions[key];
};

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        icon: { icon: 'common-dashboard', pack: 'tesla' },
        link: '/dashboard',
        hidden: hideUnavailableItems('dashboard'),
    },
    {
        title: 'My Courses',
        icon: { icon: 'common-connection', pack: 'tesla' },
        link: '/course',
        hidden: hideUnavailableItems('my-courses'),
    },
    {
        title: 'Test page',
        icon: { icon: 'common-menu_logo', pack: 'tesla' },
        link: '/test',
        hidden: hideUnavailableItems('test-page'),
    },
    {
        title: 'Administration',
        icon: { icon: 'common-notifications', pack: 'tesla' },
        link: '/institution',
        hidden: hideUnavailableItems('administration'),
        children: [
            {
                title: 'Users',
                icon: { icon: 'instrument-fa', pack: 'tesla' },
                link: '/institution/user',
                hidden: hideUnavailableItems('administration-users'),
            },
            {
                title: 'Informed Consent',
                icon: { icon: 'instrument-fr', pack: 'tesla' },
                link: '/institution/ic',
                hidden: hideUnavailableItems('administration-ic'),
            },
            {
                title: 'SEND',
                icon: { icon: 'instrument-ks', pack: 'tesla' },
                link: '/institution/send',
                hidden: hideUnavailableItems('administration-send'),
            },
            {
                title: 'Courses',
                icon: { icon: 'instrument-plagiarism', pack: 'tesla' },
                link: '/institution/course',
                hidden: hideUnavailableItems('administration-courses'),
            },
            {
                title: 'Data Management',
                icon: { icon: 'instrument-vr', pack: 'tesla' },
                link: '/institution/data-management',
                hidden: hideUnavailableItems('administration-data-management'),
            },
            {
                title: 'Settings',
                icon: { icon: 'sensor-assessment', pack: 'tesla' },
                link: '/institution/settings',
                hidden: hideUnavailableItems('administration-settings'),
            },
        ],
    },
    {
        title: 'Statistics',
        icon: { icon: 'sensor-camera', pack: 'tesla' },
        link: '/statistics',
        hidden: hideUnavailableItems('statistics'),
    },
    {
        title: 'Monitoring',
        icon: { icon: 'sensor-keyboard', pack: 'tesla' },
        link: '/monitoring',
        hidden: hideUnavailableItems('monitoring'),
    },
    {
        title: 'System',
        icon: { icon: 'sensor-microphone', pack: 'tesla' },
        link: '/system',
        hidden: hideUnavailableItems('system'),
        children: [
            {
                title: 'Users',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/admin-user',
                hidden: hideUnavailableItems('system-users'),
            },
            {
                title: 'Institutions',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/institution',
                hidden: hideUnavailableItems('system-institutions'),
            },
            {
                title: 'Instruments',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/instrument',
                hidden: hideUnavailableItems('system-instruments'),
            },
            {
                title: 'Services',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/service',
                hidden: hideUnavailableItems('system-services'),
            },
            {
                title: 'Status',
                icon: { icon: 'common-dashboard', pack: 'tesla' },
                link: '/system/status',
                hidden: hideUnavailableItems('system-status'),
            },
        ],
    },
];
