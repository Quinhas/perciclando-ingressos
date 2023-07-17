'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

interface TicketDetailsProps {
  params: {
    id: string;
  };
}

interface Ticket {
  id: string;
  name: string;
  number: number;
  createdAt: Date;
  updatedAt?: Date;
}

export default function TicketDetails({ params: { id } }: TicketDetailsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [ticket, setTicket] = useState<Ticket>();

  async function getTicket(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://perciclando-api-production.up.railway.app/tickets/${id}`,
      );

      const ticket: Ticket = await res.json();

      console.log(ticket);

      setTicket(ticket);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTicket(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center bg-zinc-900 h-screen'>
        <Card className='max-w-[80%] w-96'>
          <CardHeader>
            <CardTitle>Perciclando - 10 Anos</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <QRCode value={`Ingresso${ticket.id}`} /> */}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className='flex items-center justify-center bg-zinc-900 h-screen'>
        <Card className='max-w-[80%] w-96'>
          <CardHeader>
            <CardTitle>Perciclando - 10 Anos</CardTitle>
            <CardDescription>Erro...</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <QRCode value={`Ingresso${ticket.id}`} /> */}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center bg-zinc-900 h-screen'>
      <Card className='max-w-[80%] w-96 flex flex-col items-center justify-center'>
        <CardHeader className='space-y-0'>
          <CardTitle>Perciclando - 10 Anos</CardTitle>
          <CardDescription>
            Ingresso #{String(ticket.number).padStart(3, '0')}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-1'>
          <QRCode value={`Ingresso${ticket.id}`} />
          <p className='text-center font-light'>{ticket.name}</p>
        </CardContent>
      </Card>
    </div>
  );
}
