'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ApplicationException from '@/errors/application-exception';
import { ticketsService } from '@/services/perciclando-api/tickets';
import { Transition } from '@headlessui/react';
import { CameraDevice, Html5Qrcode } from 'html5-qrcode';
import { Camera, CheckCircle2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

type ValidatePages = 'result' | 'camera';

export default function ValidateTicket() {
  const [cameras, setCameras] = useState<CameraDevice[]>();
  const [selectedCamera, setSelectedCamera] = useState<string>();
  const [scanner, setScanner] = useState<Html5Qrcode>();
  const [isScanning, setIsScanning] = useState(false);
  const [showPage, setShowPage] = useState<ValidatePages>('camera');
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<string>();

  useEffect(() => {
    setScanner(undefined);
    if (showPage === 'camera') {
      setError(undefined);
      setIsScanning(false);
      setScanner(undefined);
      getCameras().then(() => {
        const scanner: Html5Qrcode = new Html5Qrcode('reader');
        setScanner(scanner);
      });
    }
  }, [showPage]);

  async function onSuccess(result: string) {
    try {
      console.log(result);
      setResult(result);
      await stopCamera();
      await ticketsService.validate({ id: result });
    } catch (err) {
      const message =
        err instanceof ApplicationException
          ? err.message
          : 'Não foi possível validar o ingresso. Tente novamente';
      toast.error(message, {
        className: 'bg-red-500 text-red-50 dark:bg-red-300 dark:text-red-900',
        position: 'bottom-center',
      });
    } finally {
      setShowPage('result');
    }
  }

  async function getCameras() {
    const cameras = await Html5Qrcode.getCameras();
    console.log(cameras);

    if (cameras.length <= 0) {
      toast.error('Câmera não encontrada. Tente novamente.', {
        className: 'bg-red-500 text-red-50 dark:bg-red-300 dark:text-red-900',
        position: 'bottom-center',
      });
      return;
    }

    setCameras(cameras);
    setSelectedCamera(cameras[0].id);
  }

  function onError(err: string) {
    console.log(err);
  }

  async function startCamera() {
    if (!scanner) {
      toast.error('Scanner não encontrado. Tente novamente.', {
        className: 'bg-red-500 text-red-50 dark:bg-red-300 dark:text-red-900',
        position: 'bottom-center',
      });
      return;
    }

    if (scanner.isScanning) {
      await scanner.stop();
      console.log('teste');
    }

    if (!selectedCamera) {
      toast.error('Nenhuma câmera selecionada. Tente novamente.', {
        className: 'bg-red-500 text-red-50 dark:bg-red-300 dark:text-red-900',
        position: 'bottom-center',
      });
      return;
    }

    setIsScanning(true);

    await scanner.start(
      { deviceId: selectedCamera },
      { fps: 10, aspectRatio: 1 },
      onSuccess,
      onError,
    );
  }

  async function stopCamera() {
    await scanner?.stop();
    setIsScanning(false);
  }

  return (
    <Card className='flex-grow h-full flex flex-col'>
      <CardHeader>
        <CardTitle>Validar Ingresso</CardTitle>
      </CardHeader>
      <CardContent className='flex items-center justify-center w-full'>
        <Transition
          show={showPage === 'result'}
          enter='transition-opacity duration-75 absolute'
          enterFrom='opacity-0 absolute'
          enterTo='opacity-100'
          leave='transition-opacity duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          className='w-full'
        >
          <div className='w-auto h-96 max-h-full max-w-full aspect-square rounded flex items-center flex-col gap-2'>
            {error && (
              <>
                <XCircle className='w-60 h-auto text-red-500 dark:text-red-300' />
                <p className='text-lg font-semibold text-red-500 dark:text-red-300'>
                  Ingresso inválido!
                </p>
                <p className='text-muted-foreground text-sm'>{error}</p>
                <p className='text-muted-foreground text-xs text-center'>
                  {result}
                </p>
              </>
            )}
            {!error && (
              <>
                <CheckCircle2 className='w-60 h-auto text-green-500 dark:text-green-300' />
                <p className='text-lg font-semibold text-green-500 dark:text-green-300'>
                  Ingresso válido!
                </p>
              </>
            )}
          </div>
        </Transition>
        <Transition
          show={showPage === 'camera'}
          enter='transition-opacity duration-75'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          className='w-full'
        >
          <div
            className={twMerge(
              'w-full h-96 flex flex-col justify-between',
              isScanning ? '' : 'items-center rounded',
            )}
          >
            <div
              className={twMerge(
                'flex w-full max-h-full max-w-full aspect-square rounded overflow-hidden bg-foreground/5 items-center justify-center p-8',
                isScanning ? 'hidden' : '',
              )}
            >
              <Camera className='w-36 h-auto text-foreground/70 flex-grow aspect-square' />
            </div>
            <div
              id='reader'
              className='w-auto max-h-full max-w-full aspect-square rounded overflow-hidden'
            ></div>
            <Select
              value={selectedCamera}
              disabled={isScanning}
            >
              <SelectTrigger className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
                <SelectValue placeholder='Selecione uma câmera' />
              </SelectTrigger>
              <SelectContent>
                {cameras?.map((camera) => (
                  <SelectItem
                    key={camera.id}
                    value={camera.id}
                  >
                    {camera.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Transition>
      </CardContent>
      <Transition
        show={showPage === 'camera'}
        enter='transition-opacity duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <CardFooter className='flex flex-col gap-2'>
          {!isScanning && (
            <Button
              className='w-full btn-green'
              onClick={() => startCamera()}
              disabled={cameras?.length === 0 || !selectedCamera}
            >
              Iniciar Câmera
            </Button>
          )}
          {isScanning && (
            <Button
              className='w-full btn-red'
              onClick={() => stopCamera()}
            >
              Parar Câmera
            </Button>
          )}
        </CardFooter>
      </Transition>
      <Transition
        show={showPage === 'result'}
        enter='transition-opacity duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <CardFooter className='flex flex-col gap-2'>
          <Button
            className='w-full btn-blue'
            onClick={() => setShowPage('camera')}
          >
            Voltar
          </Button>
        </CardFooter>
      </Transition>
    </Card>
  );
}
