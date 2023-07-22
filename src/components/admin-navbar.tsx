import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Logo } from './logo';
import { Navbar } from './ui/navbar';
import { NavbarItem } from './ui/navbar/navbar-item';
import { ThemeToggle } from './ui/theme-toggle';

const navigation = [
  // { name: 'Integrantes', href: 'users', current: false },
  { name: 'Ingressos', href: 'tickets' },
];

export function AdminNavbar() {
  const { pathname } = useRouter();

  useEffect(() => {
    console.log(pathname);
    console.log(pathname.split('/', 3)[2]);
  }, [pathname]);

  return (
    <Navbar.Root>
      <div className='relative flex h-16 items-center justify-between'>
        <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
          <div className='flex flex-shrink-0 items-center'>
            <Link href='/admin'>
              <Logo className='h-8 w-auto transition-colors hover:text-green-600 dark:hover:text-green-200' />
            </Link>
          </div>
          <div className='hidden sm:ml-6 sm:block'>
            <div className='flex space-x-4'>
              {navigation.map((item) => (
                <Link
                  href={`/admin/${item.href}`}
                  key={item.href}
                >
                  <NavbarItem
                    current={item.href === `${pathname.split('/', 3)[2]}`}
                  >
                    {item.name}
                  </NavbarItem>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
          <ThemeToggle />
        </div>
      </div>
    </Navbar.Root>
  );
}
