'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ApplicationException from '@/errors/application-exception';
import { ticketsService } from '@/services/perciclando-api/tickets';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

interface FormFields {
  name: string;
  ticketNumber: number;
}

const formSchema = yup
  .object({
    name: yup.string().required(),
    ticketNumber: yup.number().positive().integer().required().min(0).max(500),
  })
  .required();

export default function NewTicket() {
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: '',
      ticketNumber: 0,
    },
  });

  async function onSubmit(values: FormFields) {
    try {
      const data = await ticketsService.create({
        name: values.name,
        number: values.ticketNumber,
      });

      toast.success('Ingresso criado com sucesso!', {
        className:
          'bg-green-500 text-green-50 dark:bg-green-300 dark:text-green-900',
        position: 'bottom-center',
      });

      router.push(`/admin/tickets/`);
    } catch (err) {
      const message =
        err instanceof ApplicationException
          ? err.message
          : 'Não foi possível criar o ingresso. Tente novamente';
      toast.error(message, {
        className: 'bg-red-500 text-red-50 dark:bg-red-300 dark:text-red-900',
        position: 'bottom-center',
      });
    }
  }

  return (
    <Card className='flex-grow h-full flex flex-col'>
      <CardHeader>
        <CardTitle>Novo Ingresso</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4 justify-around'
          >
            <FormField
              control={form.control}
              name='ticketNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do Ingresso</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Número do Ingresso'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Nome'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full btn-yellow'
            >
              Gerar Ingresso
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
