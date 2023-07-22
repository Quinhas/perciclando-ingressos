'use client';

import { Ticket, ticketsService } from '@/services/perciclando-api/tickets';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Check, Loader2, QrCode } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

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
    return (
      <div className='flex items-center justify-center flex-grow h-16'>
        <Loader2 className='animate-spin' />
      </div>
    );
  }

  if (tickets === null) {
    return (
      <Card>
        <CardHeader>
          <Heading>Oops!</Heading>
        </CardHeader>
        <CardBody>
          Não foi possível recuperar as informações desejadas. Tente novamente.
        </CardBody>
      </Card>
    );
  }

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th className='text-right'>Nº</Th>
            <Th>Nome</Th>
            <Th className='text-right'>Criador</Th>
            <Th className='text-center'>Validado</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {tickets.length === 0 && (
            <Tr>
              <Td
                colSpan={5}
                className='text-sm p-2 text-muted-foreground'
              >
                Opa! Ainda não existem registros para serem mostrados aqui.
              </Td>
            </Tr>
          )}
          {tickets.length > 0 &&
            tickets.map((ticket) => (
              <Tr key={ticket.id}>
                <Td className='text-right'>
                  {String(ticket.number).padStart(3, '0')}
                </Td>
                <Td>{ticket.name}</Td>
                <Td className='text-right'>
                  {ticket.createdByUser?.username ?? '-'}
                </Td>
                <Td>
                  {ticket.validatedAt && (
                    <Check className='mx-auto text-green-500 dark:text-green-300' />
                  )}
                </Td>
                <Td className='text-right'>
                  <Link href={`/admin/tickets/${ticket.id}`}>
                    <Button variant='gray'>
                      <QrCode />
                    </Button>
                  </Link>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
