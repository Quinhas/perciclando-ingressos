import { HTMLAttributes, ReactNode } from 'react';

type NavbarRootProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function NavbarRoot({ children, ...rest }: NavbarRootProps) {
  return (
    <div className='bg-gray-950/5 dark:bg-gray-50/5 text-gray-900 dark:text-gray-100'>
      <nav
        className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'
        {...rest}
      >
        {children}
      </nav>
    </div>
  );
}
