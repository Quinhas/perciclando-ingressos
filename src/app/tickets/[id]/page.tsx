'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/services/api';
import { isAxiosError } from 'axios';
import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

interface TicketDetailsProps {
  params: {
    id: string;
  };
}

export interface Ticket {
  id: string;
  name: string;
  number: number;
  createdAt: Date;
  updatedAt?: Date;
}

export default function TicketDetails({ params: { id } }: TicketDetailsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [ticket, setTicket] = useState<Ticket>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    api
      .get(`/tickets/${id}`)
      .then(({ data }) => setTicket(data))
      .catch((err) => {
        if (isAxiosError(err) && err.response?.data) {
          setError(err?.response?.data.message as unknown as string);
          return;
        }

        setError(err?.message);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen bg-zinc-200'>
        <Card className='max-w-[80%] w-80 aspect-[3/4] flex flex-col items-center justify-center bg-sky-400 shadow-lg border-none text-zinc-100'>
          <CardHeader>
            <CardTitle>Perciclando - 10 Anos</CardTitle>
            <Skeleton className='w-[10ch] h-[1.25rem] bg-slate-200' />
          </CardHeader>
          <CardContent className='flex flex-col gap-1 items-center'>
            <Skeleton className='w-[256px] h-[256px] bg-slate-200' />
            <Skeleton className='text-center w-[15ch] h-[1.25rem] bg-slate-200' />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className='flex items-center justify-center h-screen bg-zinc-800'>
        <Card className='max-w-[80%] w-80 aspect-[3/4] flex flex-col items-center justify-center bg-sky-400 shadow-md border-none text-zinc-800'>
          <CardHeader>
            <CardTitle>Perciclando - 10 Anos</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-1 items-center'>
            <XCircle className='w-44 h-44 text-red-800' />
            <p className='text-2xl font-medium text-red-800'>
              Ingresso inválido!
            </p>
            <p className='font-light'>{error}</p>
          </CardContent>
          <CardFooter className='flex flex-1 w-full'>
            <Link
              href={'/'}
              className='flex flex-1'
            >
              <Button className='w-full dark:bg-zinc-200 hover:dark:bg-zinc-300 active:dark:bg-zinc-400'>
                Início
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center h-screen bg-zinc-200'>
      <Card className='max-w-[80%] w-96 flex flex-col items-center justify-center bg-sky-400 shadow-md border-none text-zinc-100'>
        <CardHeader className='space-y-0'>
          <CardTitle>Perciclando - 10 Anos</CardTitle>
          <CardDescription className='text-zinc-200'>
            Ingresso #{String(ticket.number).padStart(3, '0')}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-1 items-center'>
          <QRCode
            value={`${ticket.id}`}
            height={'256px'}
            width={'256px'}
          />
          <p className='text-center font-light'>{ticket.name}</p>
        </CardContent>
        <CardFooter className='flex flex-1 w-full'>
          <Link
            href={'/'}
            className='flex flex-1'
          >
            <Button className='w-full bg-stone-900 hover:bg-stone-800 active:bg-stone-700'>
              Início
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
