import { useAuth } from '@/hooks/use-auth';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from '@chakra-ui/react';
import { LogOut } from 'lucide-react';

export default function Admin() {
  const { signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className='flex justify-center p-4'>
      <Card>
        <CardHeader>
          <Heading>Perciclando</Heading>
        </CardHeader>
        <CardBody></CardBody>
        <CardFooter>
          <Button
            onClick={handleSignOut}
            title='Sair'
            colorScheme='blue'
            variant='solid'
          >
            Sair
            <LogOut />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
