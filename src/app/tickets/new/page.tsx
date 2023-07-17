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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Ticket } from '../[id]/page';

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
      const { data } = await api.post<Ticket>('/tickets', {
        name: values.name,
        number: values.ticketNumber,
      });

      router.push(`/tickets/${data.id}`);
    } catch (error) {
      let message = 'Ocorreram erros. Tente novamente.';
      if (isAxiosError(error) && error.response?.data) {
        message = error.response.data.message;
      }
      toast(message, {
        position: 'bottom-center',
        pauseOnHover: false,
        hideProgressBar: true,
      });
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-zinc-800'>
      <Card className='max-w-[80%] w-80 aspect-[3/4] flex flex-col justify-center bg-sky-400 shadow-lg border-none text-zinc-800'>
        <CardHeader>
          <CardTitle>Perciclando</CardTitle>
          <CardDescription className='text-zinc-800'>
            Gerador de Ingressos
          </CardDescription>
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
              <Button
                type='submit'
                className='w-full bg-stone-900 hover:bg-stone-800 active:bg-stone-700'
              >
                Gerar Ingresso
              </Button>
            </form>
          </Form>
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
