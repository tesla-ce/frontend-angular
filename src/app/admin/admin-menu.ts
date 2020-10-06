import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Admin',
    icon: 'award-outline',
    link: '/admin',
    home: true,
    selected: true,
  },
  {
    title: 'Instructor',
    icon: 'cube-outline',
    link: '/instructor',
    home: true,
  },
  {
    title: 'Learner',
    icon: 'book-outline',
    link: '/learner',
    home: true,
  },
];
