import BarCodeScanner from "components/BarCodeScanner";
import { Button, Input, Sheet, Text, TextArea, View, XStack, YStack } from "tamagui";
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Minus, Plus, X } from "@tamagui/lucide-icons";
import database, { inventoryCollection } from "model";
import Products from "model/db/products";


export default function NewInventory() {

    const [open, setOpen] = useState(true);
    const [snapPoints, setSnapPoints] = useState([30]);
    const [scannedCode, setScannedCode] = useState<string>('');

    const [_name, setName] = useState('');
    const [_description, setDescription] = useState('');
    const [_quantity, setQuantity] = useState(0);
    const [_price, setPrice] = useState(0);

    function handleCodeScanned(code: string) {
        console.log(code);
        setScannedCode(code);
        setSnapPoints([90]);
    }

    async function Confirm() {
        const productCollection = database.get<Products>('products');

        await database.write(async () => {
           try {
             const $product = await productCollection.create((product) => {
                 product.name = _name;
                 product.description = _description;
                 product.barcode = scannedCode;
             });
 
             const _inventory = await inventoryCollection.create((inventory) => {
                 inventory.price = _price;
                 inventory.stock = _quantity;
                 inventory.business.set(null);
                 inventory.productId = $product.id;
             });
           } catch (error) {
                console.log(error);
           }

            setName('');
            setDescription('');
            setQuantity(0);
            setPrice(0);
            setScannedCode('');
            setSnapPoints([30]);

        });
    }

    return (<View>
        <BarCodeScanner aspectRatio={4 / 5}
            shifts={{ x: 50, y: 100 }}
            _onCodeScanned={handleCodeScanned}
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
                        <Text>Barcode: {scannedCode}</Text>


                        {scannedCode.length > 0 ? (
                            <View space="$4">
                                <XStack space="$4">
                                    <Input
                                        placeholder="Product Name"
                                        flex={1}
                                        value={_name}
                                        onChangeText={setName}
                                    />
                                </XStack>
                                <XStack space="$4">
                                    <TextArea
                                        placeholder="Product Description"
                                        flex={1}
                                        value={_description}
                                        onChangeText={setDescription}
                                    />
                                </XStack>
                                <XStack space="$4">
                                    <Input
                                        placeholder="Product Quantity"
                                        flex={1}
                                        keyboardType="numeric"
                                        value={_quantity.toString()}
                                        onChangeText={(text) => setQuantity(parseInt(text))}
                                    />
                                    <Button
                                        px="$3"
                                        py="$2"
                                        onPress={() => setQuantity(_quantity - 1)}
                                    >
                                        <Minus />
                                    </Button>
                                    <Button
                                        px="$3"
                                        py="$2"
                                        onPress={() => setQuantity(_quantity + 1)}
                                    >
                                        <Plus />
                                    </Button>
                                </XStack>
                                <XStack space="$4">
                                    <Input
                                        placeholder="Product Price"
                                        flex={1}
                                        keyboardType="numeric"
                                        value={_price.toString()}
                                        onChangeText={(text) => setPrice(parseFloat(text))}
                                    />
                                </XStack>
                            </View>
                        ) : <></>}

                        <XStack space="$4">
                            <Button
                                flex={1}
                                theme="alt1"
                                onPress={() => { setSnapPoints([30]); setScannedCode('') }}
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