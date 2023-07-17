'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
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

export default function Home() {
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
      const response = await fetch(
        'https://perciclando-api-production.up.railway.app/tickets',
        {
          method: 'POST',
          body: JSON.stringify({
            name: values.name,
            number: values.ticketNumber,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const ticket = await response.json();
      router.push(`/tickets/${ticket.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex items-center justify-center bg-zinc-900 h-screen'>
      <Card className='max-w-[80%] w-96'>
        <CardHeader>
          <CardTitle>Perciclando</CardTitle>
          <CardDescription>Gerador de Ingressos</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-4'
            >
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
              <Button type='submit'>Gerar Ingresso</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
