import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import ApplicationException from '@/errors/application-exception';
import { useAuth } from '@/hooks/use-auth';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
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
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
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
      router.push('/admin');
    } catch (err) {
      const message =
        err instanceof ApplicationException
          ? err.message
          : 'Não foi possível fazer login. Tente novamente.';
      toast({
        description: message,
        colorScheme: 'red',
        position: 'bottom',
      });
    }
  }

  return (
    <div className='flex justify-center flex-grow p-4'>
      <div className='flex items-center justify-center'>
        <div className='absolute right-4 top-4'>
          <ThemeToggle />
        </div>
        <Card
          className='max-w-[80%] w-96 aspect-[3/4] flex flex-col shadow-lg'
          variant={'outline'}
          bgColor={useColorModeValue('gray.50', 'gray.950')}
        >
          <CardHeader className='space-y-1.5'>
            <h3 className='text-2xl font-semibold leading-none tracking-tight'>
              Perciclando
            </h3>
            <Text className='text-sm text-muted-foreground'>
              Administracional
            </Text>
          </CardHeader>
          <CardBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-4'
            >
              <FormControl isInvalid={!!errors.username}>
                <FormLabel htmlFor='username'>Nome de Usuário</FormLabel>
                <Input
                  placeholder='Nome de Usuário'
                  type='text'
                  {...register('username')}
                />
                {errors.username && (
                  <FormErrorMessage>{errors.username.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor='password'>Senha</FormLabel>
                <Input
                  placeholder='Nome de Usuário'
                  type='password'
                  {...register('password')}
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>
              <Button
                type='submit'
                colorScheme='green'
              >
                Entrar
              </Button>
            </form>
          </CardBody>
          <CardFooter className='flex justify-center'>
            <Logo className='text-3xl' />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
