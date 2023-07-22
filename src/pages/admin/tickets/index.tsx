import { TicketsTable } from '@/components/tickets-table';
import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';
import { TicketsContainer } from './tickets-container';

export default function Tickets() {
  return (
    <TicketsContainer>
      <main className='flex-grow'>
        <Card className='flex-grow h-full'>
          <CardHeader>
            <Heading>Ingressos</Heading>
          </CardHeader>
          <CardBody>
            <TicketsTable />
          </CardBody>
        </Card>
      </main>
    </TicketsContainer>
  );
}
