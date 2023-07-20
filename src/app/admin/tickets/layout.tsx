'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='flex min-h-full w-full sm:max-w-[80%] mx-auto justify-center gap-1 flex-col sm:flex-row'>
        <Card className='p-2 min-w-[18rem]'>
          <CardContent className='flex flex-col gap-4'>
            {/* <div className='flex flex-col items-center gap-2'>
              <Avatar className='w-40 h-auto aspect-square'>
                <AvatarFallback>LS</AvatarFallback>
              </Avatar>
              <p>Lucas Santana</p>
            </div> */}
            <div className='flex flex-col gap-2'>
              <Link href='/admin/tickets'>
                <Button className='w-full btn-blue'>Ingressos</Button>
              </Link>
              <Link href='/admin/tickets/new'>
                <Button className='w-full btn-blue'>Criar Ingresso</Button>
              </Link>
              <Link href='/admin/tickets/validate'>
                <Button className='w-full btn-blue'>Validar Ingresso</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <main className='flex-grow'>{children}</main>
      </div>
    </>
  );
}
