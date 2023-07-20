'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { LogOut } from 'lucide-react';

export default function Admin() {
  const { signOut } = useAuth();

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {}
  }

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Perciclando</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleSignOut}
            title='Sair'
            className='flex flex-row gap-2 items-center justify-center w-full btn-blue'
            type='button'
          >
            Sair
            <LogOut />
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
