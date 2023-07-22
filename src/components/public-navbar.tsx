const navigation = [
  { name: 'Sobre Nós', href: '#', current: false },
  { name: 'Discografia', href: '#', current: false },
  { name: 'Eventos', href: '#', current: false },
  { name: 'Contato', href: '#', current: false },
];

export function PublicNavbar() {
  return (
    // <Disclosure
    //   as='nav'
    //   className='bg-foreground/5'
    // >
    //   {({ open }) => (
    //     <>
    //       <nav className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
    //         <div className='relative flex h-16 items-center justify-between'>
    //           <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
    //             <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
    //               <span className='sr-only'>Open main menu</span>
    //               {open ? (
    //                 <X
    //                   className='block h-6 w-6'
    //                   aria-hidden='true'
    //                 />
    //               ) : (
    //                 <MenuIcon
    //                   className='block h-6 w-6'
    //                   aria-hidden='true'
    //                 />
    //               )}
    //             </Disclosure.Button>
    //           </div>
    //           <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
    //             <div className='flex flex-shrink-0 items-center'>
    //               <Link href='/admin'>
    //                 <Logo className='h-8 w-auto transition-colors hover:text-green-600 dark:hover:text-green-200' />
    //               </Link>
    //             </div>
    //             <div className='hidden sm:ml-6 sm:block'>
    //               <div className='flex space-x-4'>
    //                 {navigation.map((item) => (
    //                   <Link
    //                     href={`/admin/${item.href}`}
    //                     key={item.href}
    //                   >
    //                     <NavbarItem current={item.current}>
    //                       {item.name}
    //                     </NavbarItem>
    //                   </Link>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>
    //           <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
    //             <ThemeToggle />
    //           </div>
    //         </div>
    //       </nav>

    //       <Transition.Child
    //         enter='transition ease-in-out duration-300 transform'
    //         enterFrom='opacity-0 -translate-x-full'
    //         enterTo='translate-x-0 opacity-100'
    //         leave='transition ease-in-out duration-300 transform'
    //         leaveFrom='translate-x-0 opacity-100'
    //         leaveTo='-translate-x-full opacity-0'
    //       >
    //         <Disclosure.Panel className='sm:hidden'>
    //           <div className='space-y-1 px-2 pb-3 pt-2'>
    //             {navigation.map((item) => (
    //               <Link
    //                 href={`/admin/${item.href}`}
    //                 key={item.href}
    //               >
    //                 <NavbarItem current={item.current}>{item.name}</NavbarItem>
    //               </Link>
    //             ))}
    //           </div>
    //         </Disclosure.Panel>
    //       </Transition.Child>
    //     </>
    //   )}
    // </Disclosure>
    <p>teste</p>
  );
}
