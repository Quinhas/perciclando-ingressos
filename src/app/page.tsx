'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex items-center justify-center h-screen bg-zinc-800'>
      <Card className='max-w-[80%] w-80 aspect-[3/4] flex flex-col bg-sky-400 shadow-lg border-none text-zinc-800'>
        <CardHeader>
          <CardTitle>Perciclando</CardTitle>
          <CardDescription className='text-zinc-800'>
            Concerto - 10 Anos
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <Link href={'/tickets/new'}>
            <Button className='w-full bg-stone-900 hover:bg-stone-800 active:bg-stone-700'>
              Gerar Ingresso
            </Button>
          </Link>
          <Link href={'/tickets/validate'}>
            <Button className='w-full bg-stone-900 hover:bg-stone-800 active:bg-stone-700'>
              Validar Ingresso
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
