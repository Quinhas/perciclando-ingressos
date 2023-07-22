import ApplicationException from '@/errors/application-exception';
import { ticketsService } from '@/services/perciclando-api/tickets';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Select,
  useToast,
} from '@chakra-ui/react';
import { CameraDevice, Html5Qrcode } from 'html5-qrcode';
import { Camera, CheckCircle2, XCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TicketsContainer } from '../tickets-container';

type ValidatePages = 'result' | 'camera';

export default function ValidateTicket() {
  const [cameras, setCameras] = useState<CameraDevice[]>();
  const [selectedCamera, setSelectedCamera] = useState<string>();
  const [scanner, setScanner] = useState<Html5Qrcode>();
  const [isScanning, setIsScanning] = useState(false);
  const [showPage, setShowPage] = useState<ValidatePages>('camera');
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<string>();
  const toast = useToast();

  const getCameras = useCallback(async () => {
    const cameras = await Html5Qrcode.getCameras();
    console.log(cameras);

    if (cameras.length <= 0) {
      toast({
        description: 'Câmera não encontrada. Tente novamente.',
        colorScheme: 'red',
        position: 'bottom',
      });
      return;
    }

    setCameras(cameras);
    setSelectedCamera(cameras[0].id);
  }, [toast]);

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
  }, [showPage, getCameras]);

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
      toast({
        description: message,
        colorScheme: 'red',
        position: 'bottom',
      });
    } finally {
      setShowPage('result');
    }
  }

  function onError(err: string) {
    console.log(err);
  }

  async function startCamera() {
    if (!scanner) {
      toast({
        description: 'Scanner não encontrado. Tente novamente.',
        colorScheme: 'red',
        position: 'bottom',
      });
      return;
    }

    if (scanner.isScanning) {
      await scanner.stop();
      console.log('teste');
    }

    if (!selectedCamera) {
      toast({
        description: 'Nenhuma câmera selecionada. Tente novamente.',
        colorScheme: 'red',
        position: 'bottom',
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
    <TicketsContainer>
      <Card className='flex-grow h-full flex flex-col'>
        <CardHeader>
          <Heading>Validar Ingresso</Heading>
        </CardHeader>
        <CardBody className='flex items-center justify-center w-full'>
          {showPage === 'result' && (
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
          )}

          {showPage === 'camera' && (
            <div
              className={twMerge(
                'w-auto h-full flex flex-col justify-between flex-grow',
                isScanning ? '' : 'items-center rounded',
              )}
            >
              <div
                className={twMerge(
                  'flex w-auto aspect-square rounded overflow-hidden bg-foreground/5 items-center justify-center p-8 flex-grow',
                  isScanning ? 'hidden' : '',
                )}
              >
                <Camera className='w-full h-full text-foreground/70 flex-grow aspect-square' />
              </div>
              <div
                id='reader'
                className={twMerge(
                  'w-auto max-h-full max-w-full aspect-square rounded overflow-hidden',
                  isScanning ? '' : 'hidden',
                )}
              ></div>
              <Select
                value={selectedCamera}
                disabled={isScanning}
              >
                {cameras?.map((camera) => (
                  <option
                    key={camera.id}
                    value={camera.id}
                  >
                    {camera.label}
                  </option>
                ))}
              </Select>
            </div>
          )}
        </CardBody>
        <CardFooter className='flex flex-col gap-2'>
          {showPage === 'camera' && (
            <>
              {!isScanning && (
                <Button
                  colorScheme='green'
                  w={'full'}
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
            </>
          )}
          {showPage === 'result' && (
            <Button
              colorScheme='blue'
              w={'full'}
              onClick={() => setShowPage('camera')}
            >
              Voltar
            </Button>
          )}
        </CardFooter>
      </Card>
    </TicketsContainer>
  );
}
