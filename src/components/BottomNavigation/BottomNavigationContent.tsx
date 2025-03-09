import { BottomNavigation } from '@/components/BottomNavigation';
import { MENUS, type MenuType } from '@/constants/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/utils/classname';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  className?: string;
  renderPlaceholder?: boolean;
};

const BottomNavigationContent: React.FC<Props> = ({
  className,
  renderPlaceholder,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('bottomNavigation');

  return (
    <>
      {renderPlaceholder && <div className={cn('h-18')} aria-hidden />}

      <BottomNavigation className={cn('shadow-top w-full', className)}>
        {MENUS.map(({ label, icon, href }) => (
          <BottomNavigation.Item
            key={label}
            label={t(label) as MenuType['label']}
            isActive={href === pathname}
            icon={icon}
            onButtonClick={() => router.push(href)}
          />
        ))}
      </BottomNavigation>
    </>
  );
};

export default BottomNavigationContent;
