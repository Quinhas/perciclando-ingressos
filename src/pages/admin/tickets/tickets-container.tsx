import { TicketsMenu } from '@/components/tickets-menu';
import { ReactNode } from 'react';

export function TicketsContainer({ children }: { children: ReactNode }) {
  return (
    <div className='flex justify-center flex-grow p-4'>
      <div className='flex min-h-full w-full sm:max-w-[80%] mx-auto justify-center gap-1 flex-col sm:flex-row'>
        <TicketsMenu />
        <main className='flex-grow'>{children}</main>
      </div>
    </div>
  );
}
