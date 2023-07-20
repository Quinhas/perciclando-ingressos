'use client';

import { Ticket, ticketsService } from '@/services/perciclando-api/tickets';
import { Check, Loader2, QrCode } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export function TicketsTable() {
  const [tickets, setTickets] = useState<Ticket[] | undefined | null>(
    undefined,
  );

  const getTickets = useCallback(async () => {
    try {
      const data = await ticketsService.getAll();
      setTickets(data);
    } catch {
      setTickets(null);
    }
  }, []);

  useEffect(() => {
    getTickets();
  }, [getTickets]);

  if (tickets === undefined) {
    return <Loader2 className='animate-spin' />;
  }

  if (tickets === null) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Oops!</CardTitle>
        </CardHeader>
        <CardContent>
          Não foi possível recuperar as informações desejadas. Tente novamente.
        </CardContent>
      </Card>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-right'>Nº</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead className='text-right'>Criador</TableHead>
          <TableHead className='text-center'>Validado</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className='text-sm p-2 text-muted-foreground'
            >
              Opa! Ainda não existem registros para serem mostrados aqui.
            </TableCell>
          </TableRow>
        )}
        {tickets.length > 0 &&
          tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className='text-right'>
                {String(ticket.number).padStart(3, '0')}
              </TableCell>
              <TableCell>{ticket.name}</TableCell>
              <TableCell className='text-right'>
                {ticket.createdByUser?.username ?? '-'}
              </TableCell>
              <TableCell>
                {ticket.validatedAt && (
                  <Check className='mx-auto text-green-500 dark:text-green-300' />
                )}
              </TableCell>
              <TableCell className='text-right'>
                <Link href={`/admin/tickets/${ticket.id}`}>
                  <Button className='btn-zinc'>
                    <QrCode />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
