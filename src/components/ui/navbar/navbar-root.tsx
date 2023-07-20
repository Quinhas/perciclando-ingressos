import { Disclosure } from '@headlessui/react';
import { HTMLAttributes, ReactNode } from 'react';

type NavbarRootProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export function NavbarRoot({ children, ...rest }: NavbarRootProps) {
  return (
    <Disclosure
      as='nav'
      className='bg-background/80'
      {...rest}
    >
      {children}
    </Disclosure>
  );
}
