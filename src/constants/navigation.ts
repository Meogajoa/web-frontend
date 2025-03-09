import CartFillIcon from '@/svgs/CartFillIcon';
import HomeFillIcon from '@/svgs/HomeFillIcon';
import PersonFillIcon from '@/svgs/PersonFillIcon';

const MENUS = [
  {
    label: 'store',
    icon: CartFillIcon,
    href: '/store',
  },
  {
    label: 'home',
    icon: HomeFillIcon,
    href: '/home',
  },
  {
    label: 'profile',
    icon: PersonFillIcon,
    href: '/profile',
  },
] as const;

type MenuType = (typeof MENUS)[number];

export { MENUS, type MenuType };
