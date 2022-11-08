import Group from '@/icons/Group';
import Category from '@/icons/Category';
import Calendar from '@/icons/Calendar';
import Cart from '@/icons/Cart';
import Connect from '@/icons/Connect';
import People from '@/icons/People';
import Bookmark from '@/icons/Bookmark';
import Calculator from '@/icons/Calculator';
import Help from '@/icons/Help';

export const ADMIN_NAV_ITEMS = [
  {
    href: [
      '/recipes',
      '/meal-plans',
      '/meal-plans/[id]',
      '/meal-plan-store',
      '/meal-plan-store/[id]',
      '/recipes/[id]',
      '/recipes/new',
      '/recipes/import',
    ],
    tag: 'group',
    Component: Group,
  },
];

export const NAV_ITEMS = [
  {
    href: ['/dashboard'],
    tag: 'category',
    Component: Category,
  },
  {
    href: [
      '/recipes',
      '/meal-plans',
      '/meal-plans/[id]',
      '/meal-plan-store',
      '/meal-plan-store/[id]',
      '/recipes/[id]',
      '/recipes/new',
      '/recipes/import',
    ],
    tag: 'group',
    Component: Group,
  },
  {
    href: ['/my-plan', '/my-plan/[id]'],
    tag: 'calendar',
    Component: Calendar,
  },
  {
    href: ['/shop'],
    tag: 'cart',
    Component: Cart,
  },
  {
    href: ['/feed'],
    tag: 'connect',
    Component: Connect,
  },
  {
    href: ['/people', '/my-circles', '/my-circles/profile/[id]'],
    tag: 'people',
    Component: People,
  },
  {
    href: ['/food-diary', '/water-tracker'],
    tag: 'bookmark',
    Component: Bookmark,
  },
  {
    href: ['/nutrition-calculator'],
    tag: 'calculator',
    Component: Calculator,
  },
  {
    href: ['http://box2174.temp.domains/~lfwgzamy/mfp-eyedroiduniverse-com/'],
    tag: 'help',
    Component: Help,
  },
];
