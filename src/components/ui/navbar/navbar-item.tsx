import { LiHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type NavbarItemProps = {
  current?: boolean;
  children: ReactNode;
} & LiHTMLAttributes<HTMLLIElement>;

export function NavbarItem({
  children,
  current = false,
  ...rest
}: NavbarItemProps) {
  return (
    <li
      className={twMerge(
        current
          ? 'bg-green-600 text-green-100 hover:bg-green-700 dark:bg-green-200 dark:text-green-900 dark:hover:bg-green-300'
          : 'text-black hover:text-green-600 hover:bg-green-800 hover:bg-opacity-10 dark:text-white dark:hover:text-green-200 dark:hover:bg-green-200 dark:hover:bg-opacity-10',
        'rounded-md px-3 py-2 text-sm font-medium list-none transition-colors',
      )}
      aria-current={current ? 'page' : undefined}
      {...rest}
    >
      {children}
    </li>
  );
}
