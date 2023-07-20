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
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/hooks/use-auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

interface FormFields {
  username: string;
  password: string;
}

const formSchema = yup
  .object({
    username: yup
      .string()
      .required('Campo obrigatório.')
      .max(50, 'O nome de usuário deve ter no máximo 50 caracteres.'),
    password: yup
      .string()
      .required('Campo obrigatório.')
      .min(6, 'A senha deve conter pelo menos 6 caracteres.'),
  })
  .required();

export default function SignIn() {
  const { signIn } = useAuth();
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: yupResolver(formSchema),
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: FormFields) {
    try {
      await signIn({
        username: values.username,
        password: values.password,
      });

      router.push(`/admin`);
    } catch (error) {
      let message = 'Ocorreram erros. Tente novamente.';
      if (isAxiosError(error) && error.response?.data) {
        message = error.response.data.message;
      }
      toast.error(message, {
        className: 'bg-red-500 text-red-50 dark:bg-red-300 dark:text-red-900',
        position: 'bottom-center',
      });
    }
  }

  return (
    <main className='flex items-center justify-center'>
      <div className='absolute right-4 top-4'>
        <ThemeToggle />
      </div>
      <Card className='max-w-[80%] w-96 aspect-[3/4] flex flex-col shadow-lg'>
        <CardHeader>
          <CardTitle>Perciclando</CardTitle>
          <CardDescription>Administracional</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-4'
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nome de Usuário</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Nome de Usuário'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Senha'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full btn-green'
              >
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Logo className='text-3xl' />
        </CardFooter>
      </Card>
    </main>
  );
}
