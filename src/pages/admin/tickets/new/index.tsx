import ApplicationException from '@/errors/application-exception';
import { ticketsService } from '@/services/perciclando-api/tickets';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { TicketsContainer } from '../tickets-container';

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
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: '',
      ticketNumber: 0,
    },
  });

  async function onSubmit(values: FormFields) {
    try {
      await ticketsService.create({
        name: values.name,
        number: values.ticketNumber,
      });

      toast({
        description: 'Ingresso criado com sucesso!',
        colorScheme: 'green',
        position: 'bottom',
      });

      router.push('/admin/tickets/');
    } catch (err) {
      const message =
        err instanceof ApplicationException
          ? err.message
          : 'Não foi possível criar o ingresso. Tente novamente';

      toast({
        description: message,
        colorScheme: 'red',
        position: 'bottom',
      });
    }
  }

  return (
    <TicketsContainer>
      <Card className='w-full sm:w-1/4 aspect-[3/4]'>
        <CardHeader>
          <Heading>Novo Ingresso</Heading>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4 justify-around'
          >
            <FormControl>
              <FormLabel htmlFor='ticketNumber'>Número do Ingresso</FormLabel>
              <Input
                type='number'
                placeholder='Número do Ingresso'
                {...register('ticketNumber')}
              />
              {errors.ticketNumber && (
                <FormErrorMessage>
                  {errors.ticketNumber.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='name'>Nome</FormLabel>
              <Input
                type='text'
                placeholder='Nome'
                {...register('name')}
              />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>

            <Button
              type='submit'
              w={'full'}
              colorScheme='yellow'
            >
              Gerar Ingresso
            </Button>
          </form>
        </CardBody>
      </Card>
    </TicketsContainer>
  );
}
