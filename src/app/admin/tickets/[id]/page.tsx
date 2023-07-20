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
import { Logo } from '@/components/ui/logo';
import { Skeleton } from '@/components/ui/skeleton';
import ApplicationException from '@/errors/application-exception';
import { Ticket, ticketsService } from '@/services/perciclando-api/tickets';
import { toPng } from 'html-to-image';
import { Check, Share2, XCircle } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import QRCode from 'react-qr-code';

interface TicketDetailsProps {
  params: {
    id: string;
  };
}

export default function TicketDetails({ params: { id } }: TicketDetailsProps) {
  const [ticket, setTicket] = useState<Ticket | null | undefined>(undefined);
  const [hideButtons, setHideButtons] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const getTicketData = useCallback(async () => {
    try {
      const data = await ticketsService.getById({ id });
      setTicket(data);
    } catch (error) {
      setTicket(null);
    }
  }, [id]);

  useEffect(() => {
    getTicketData();
  }, [getTicketData]);

  async function shareTicket() {
    if (!cardRef.current || !ticket) {
      toast.error('Ingresso inválido. Tente novamente.');
      return;
    }

    setHideButtons(true);

    const dataUrl = await toPng(cardRef.current, { cacheBust: false });
    const link = document.createElement('a');
    link.download = `Perciclando-${String(ticket.number).padStart(3, '0')}.png`;
    link.href = dataUrl;
    link.click();

    setHideButtons(false);
  }
  async function validateTicket() {
    try {
      if (!ticket) {
        toast.error('Ingresso inválido. Tente novamente.');
        return;
      }

      await ticketsService.validate({
        id: ticket.id,
      });

      toast.success('Ingresso validado com sucesso!', {
        className:
          'bg-green-500 text-green-50 dark:bg-green-300 dark:text-green-900',
        position: 'bottom-center',
      });
    } catch (err) {
      const message =
        err instanceof ApplicationException
          ? err.message
          : 'Não foi possível validar o ingresso. Tente novamente';
      toast.error(message, {
        className: 'bg-red-500 text-red-50 dark:bg-red-300 dark:text-red-900',
        position: 'bottom-center',
      });
    }

    setHideButtons(false);
  }

  if (ticket === undefined) {
    return (
      <Card className='flex-grow h-full flex flex-col bg-green-500 aspect-[3/4] w-[350px] text-green-900 relative'>
        <CardHeader className='space-y-0'>
          <CardTitle>Perciclando - 10 Anos</CardTitle>
          <Skeleton className='text-center w-[15ch] h-[1.25rem] bg-green-400' />
        </CardHeader>
        <CardContent className='flex flex-col gap-1 items-center flex-grow justify-center'>
          <div className='flex flex-col border-2 rounded border-solid border-green-600 w-full items-center justify-center p-2 gap-4 aspect-[3/4]'>
            <Skeleton className='rounded w-[256px] aspect-square bg-green-300' />
            <Skeleton className='text-center w-[15ch] h-[1.25rem] bg-green-300' />
          </div>
        </CardContent>
        <CardFooter className='flex items-center justify-center'>
          <Logo className='text-3xl' />
        </CardFooter>
      </Card>
    );
  }

  if (ticket === null) {
    return (
      <Card className='flex-grow h-full flex flex-col bg-green-500 aspect-[3/4] w-[350px] text-green-900 relative'>
        <CardHeader>
          <CardTitle>Perciclando - 10 Anos</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-1 items-center flex-grow justify-center'>
          <XCircle className='w-44 h-44 text-red-800' />
          <p className='text-2xl font-medium text-red-800'>
            Ingresso inválido!
          </p>
        </CardContent>
        <CardFooter className='flex items-center justify-center'>
          <Logo className='text-3xl' />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card
      className='flex-grow flex flex-col bg-green-500 aspect-square max-w-full h-auto sm:max-w-[380px] text-green-900 relative'
      ref={cardRef}
    >
      <CardHeader className='space-y-0'>
        <CardTitle>Perciclando - 10 Anos</CardTitle>
        <CardDescription className='text-green-700'>
          Ingresso #{String(ticket.number).padStart(3, '0')}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-1 items-center flex-grow justify-center'>
        <div className='flex flex-col border-2 rounded border-solid border-green-600 w-full items-center justify-center p-2 gap-4 aspect-square'>
          <QRCode
            value={`${ticket.id}`}
            className='rounded w-[256px] aspect-square mx-auto'
          />
          <p className='text-center font-light'>{ticket.name}</p>
        </div>
      </CardContent>
      <CardFooter className='flex items-center justify-center'>
        <Logo className='text-3xl' />
      </CardFooter>
      {!hideButtons && (
        <>
          <Button
            onClick={() => validateTicket()}
            className='absolute bottom-2 left-2 aspect-square p-1 border-green-900 bg-transparent border-solid border-[1px] hover:bg-green-900 hover:bg-opacity-10 text-green-900'
            title='Validar Ingresso'
          >
            <span className='sr-only'>Validar Ingresso</span>
            <Check className='w-auto h-4' />
          </Button>

          <Button
            onClick={() => shareTicket()}
            className='absolute bottom-2 right-2 aspect-square p-1 border-green-900 bg-transparent border-solid border-[1px] hover:bg-green-900 hover:bg-opacity-10 text-green-900'
            title='Compartilhar Ingresso'
          >
            <span className='sr-only'>Compartilhar Ingresso</span>
            <Share2 className='w-auto h-4' />
          </Button>
        </>
      )}
    </Card>
  );
}
