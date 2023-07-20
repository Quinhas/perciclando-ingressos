import { TicketsTable } from '@/components/tickets-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Tickets() {
  return (
    <>
      <Card className='flex-grow h-full'>
        <CardHeader>
          <CardTitle>Ingressos</CardTitle>
        </CardHeader>
        <CardContent>
          <TicketsTable />
        </CardContent>
      </Card>
    </>
  );
}
