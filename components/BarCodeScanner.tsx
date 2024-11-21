import { Button, Text, View } from 'tamagui';
import { Camera, Code, CodeScanner, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useEffect, useState } from 'react';
import Svg, { Polygon } from 'react-native-svg';
import { Flashlight, FlashlightOff } from '@tamagui/lucide-icons';
import { findMostFrequentString } from 'lib/utils';

interface BarCodeScannerProps {
  aspectRatio?: number;
  shifts?: { x: number; y: number };
  _onCodeScanned?: (code: string) => void;
}

export default function BarCodeScanner({ aspectRatio, shifts, _onCodeScanned }: BarCodeScannerProps) {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [scannedCodes, setScannedCodes] = useState<Code[]>([]);
  const [torch, setTorch] = useState<'off' | 'on'>('off');

  const codeScanner: CodeScanner = {
    codeTypes: ['qr', 'ean-13', 'ean-8', 'upc-a', 'upc-e', 'code-39', 'code-93', 'code-128', 'itf', 'codabar', 'aztec', 'data-matrix', 'pdf-417'],
    onCodeScanned: (codes) => {
      setScannedCodes(prev => [...prev, ...codes]);
    },
    regionOfInterest: { x: 0.1, y: 0.1, width: 0.8, height: 0.8 },
  };

  useEffect(() => {
    if (scannedCodes.length === 0) return;

    const timer = setTimeout(() => {
      const filteredValues = scannedCodes
        .map(code => code.value)
        .filter((value): value is string => value !== undefined);
      if (_onCodeScanned) {
        _onCodeScanned(findMostFrequentString(filteredValues) ?? '');
      }
      setScannedCodes([]); // Reset after processing
    }, 100); // Debounce time

    return () => clearTimeout(timer); // Cleanup
  }, [scannedCodes, _onCodeScanned]);



  if (!hasPermission) return <PermissionsPage aspectRatio={aspectRatio} requestPerm={requestPermission} />;
  if (device == null) return <NoCameraDeviceError />;

  return (
    <View overflow='hidden' m='$3.5' br={12} position='relative'>
      <Camera
        style={{ aspectRatio: aspectRatio ?? 3 / 4 }}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
        pixelFormat='rgb'
        torch={torch}
      />
      <Svg style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
      }}>
        {scannedCodes.map((code, index) => {
          const points = code.corners ? code.corners.map(corner => `${corner.x - (shifts?.x ?? 50)},${corner.y - (shifts?.y ?? 190)}`).join(' ') : '';
          return (
            <Polygon key={index} points={points} fill="rgba(255, 0, 0, 0.3)" stroke="red" strokeWidth={2} />
          );
        })}
      </Svg>
      {device?.hasTorch ? (<Button
        onPress={() => setTorch(torch === 'on' ? 'off' : 'on')}
        style={{ position: 'absolute', bottom: 16, right: 16 }}
        br={30}
        p={8}
        px={10}
        aspectRatio={1}
        bg={torch === 'on' ? '$blue10' : '$background'}
      >
        {torch === 'on' ? <Flashlight size={20} /> : <FlashlightOff size={20} />}
      </Button>) : (<></>)}
    </View>
  );
}

const PermissionsPage = ({ requestPerm, aspectRatio }) => (
  <View p='$3'><View aspectRatio={aspectRatio ?? 3 / 2} space w='100%' jc='center' ai='center' borderWidth={1} borderColor='gray' br={12}>
    <Text>Camera permission required</Text>
    <Button bg='$white1' onPress={requestPerm}>Start Camera</Button>
  </View></View>
);

const NoCameraDeviceError = () => (
  <View>
    <Text>Camera not available</Text>
  </View>
);