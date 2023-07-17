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
import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ValidateTicket() {
  const router = useRouter();
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 10,
        qrbox: { width: 256, height: 256 },
        disableFlip: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false,
    );

    scanner.render(
      (result) => {
        console.log(result);
        scanner.clear();
        router.push(`/tickets/${result}`);
      },
      (err) => {
        console.log(err);
      },
    );

    return () => {
      scanner.clear();
    };
  }, [router]);

  return (
    <div className='flex items-center justify-center h-screen bg-zinc-800'>
      <Card className='max-w-[80%] w-80 aspect-[3/4] flex flex-col items-center justify-center bg-sky-400 shadow-lg border-none text-zinc-800'>
        <CardHeader>
          <CardTitle>Perciclando</CardTitle>
          <CardDescription className='text-zinc-800'>
            Validar Ingresso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div id='reader'></div>
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
