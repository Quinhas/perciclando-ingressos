'use client';
import { AdminNavbar } from '@/components/admin-navbar';
import { useAuth } from '@/hooks/use-auth';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogged } = useAuth();

  return (
    <>
      {isLogged && <AdminNavbar />}
      <main className='flex justify-center flex-grow p-4 '>{children}</main>
    </>
  );
}
