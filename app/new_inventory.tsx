import BarCodeScanner from "components/BarCodeScanner";
import { Button, Input, Sheet, Text, TextArea, View, XStack, YStack } from "tamagui";
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Minus, Plus, X } from "@tamagui/lucide-icons";


export default function NewInventory() {

    const [open, setOpen] = useState(true);
    const [snapPoints, setSnapPoints] = useState([30]);
    const [scannedCode, setScannedCode] = useState<Set<string>>(new Set());

    const [product, setProduct] = useState({
        name: '',
        description: '',
        quantity: 0,
        price: 0,
    });

    function handleProductChange(key: string, value: string | number) {
        setProduct({ ...product, [key]: value });
    }

    function handleCodeScanned(code: string[]) {
        // if (snapPoints[0] === 90) return;
        setScannedCode(new Set(code));
        setScannedCode(new Set([...scannedCode, ...code]));
        // setOpen(true);
        setSnapPoints([90]);
    }

    function Confirm() {
        
    }

    return (<View>
        <BarCodeScanner aspectRatio={4 / 5}
            shifts={{ x: 50, y: 100 }}
            _onCodeScanned={(code) => handleCodeScanned(code)}
        />
        <SafeAreaView>
            <Sheet
                modal
                open={open}
                onOpenChange={(open) => setOpen(true)}
                snapPoints={snapPoints}
                dismissOnSnapToBottom={false}
                zIndex={100000}
            >
                {/* {snapPoints[0] !== 90 ? <Sheet.Overlay /> : <></>} */}
                <Sheet.Frame style={{
                    // borderTopLeftRadius: 20, borderTopRightRadius: 20,
                    boxShadow: '0px 0px 10px rgba(0,0,0,0.6)',
                }}>
                    <YStack flex={1} h='100%' padding="$4" space="$4">
                        <Sheet.Handle bg={'black'} />
                        <Text fontWeight="bold" fontSize="$6">Scanned Product</Text>
                        <Text>Barcode: {Array.from(scannedCode)?.map((code) => code).join(', ')}</Text>


                        {scannedCode.size > 0 ? (
                            <View space="$4">
                                <XStack space="$4">
                                    <Input
                                        placeholder="Product Name"
                                        flex={1}
                                        value={product.name}
                                        onChangeText={(text) => handleProductChange('name', text)}
                                    />
                                </XStack>
                                <XStack space="$4">
                                    <TextArea
                                        placeholder="Product Description"
                                        flex={1}
                                        value={product.description}
                                        onChangeText={(text) => handleProductChange('description', text)}
                                    />
                                </XStack>
                                <XStack space="$4">
                                    <Input
                                        placeholder="Product Quantity"
                                        flex={1}
                                        keyboardType="numeric"
                                        value={product.quantity.toString()}
                                        onChangeText={(text) => handleProductChange('quantity', parseInt(text))}
                                    />
                                    <Button
                                        px="$3"
                                        py="$2"
                                        onPress={() => handleProductChange('quantity', product.quantity - 1)}
                                    >
                                        <Minus />
                                    </Button>
                                    <Button
                                        px="$3"
                                        py="$2"
                                        onPress={() => handleProductChange('quantity', product.quantity + 1)}
                                    >
                                        <Plus />
                                    </Button>
                                </XStack>
                                <XStack space="$4">
                                    <Input
                                        placeholder="Product Price"
                                        flex={1}
                                        keyboardType="numeric"
                                        value={product.price.toString()}
                                        onChangeText={(text) => handleProductChange('price', parseFloat(text))}
                                    />
                                </XStack>
                            </View>
                        ) : <></>}

                        <XStack space="$4">
                            <Button
                                flex={1}
                                theme="alt1"
                                onPress={() => { setSnapPoints([30]); setScannedCode(new Set()) }}
                            >
                                Scan Again
                            </Button>
                            <Button
                                flex={1}
                                theme="active"
                                onPress={Confirm}
                            >
                                Confirm
                            </Button>
                        </XStack>
                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </SafeAreaView>
    </View>)
}