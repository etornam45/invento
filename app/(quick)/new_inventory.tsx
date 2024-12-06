import BarCodeScanner from "components/BarCodeScanner";
import { Button, Input, Sheet, Text, TextArea, View, XStack, YStack } from "tamagui";
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useState } from "react";
import { Minus, Plus, X } from "@tamagui/lucide-icons";
import database, { inventoryCollection, productsCollection } from "model";
import Products from "model/db/products";
import { Q } from "@nozbe/watermelondb";


export default function NewInventory() {

    const [product_id, setProduct_id] = useState<string>('');
    const [inventory_id, setInventory_id] = useState<string>('');
    const [scannedCode, setScannedCode] = useState<string>('');

    const [_name, setName] = useState('');
    const [_description, setDescription] = useState('');
    const [_quantity, setQuantity] = useState('');
    const [_price, setPrice] = useState('');

    async function handleCodeScanned(code: string) {
        console.log(code);
        await database.write(async () => {
            try {
                const product = await productsCollection.query(Q.where('barcode', code)).fetch();
                if (product.length > 0) {
                    const inventory = await inventoryCollection.query(Q.where('product_id', product[0]?.id)).fetch();
                    if (inventory) {
                        setName(product[0].name);
                        setDescription(product[0].description);
                        setQuantity(inventory[0].stock);
                        setPrice(inventory[0].price);
                        setInventory_id(inventory[0].id);
                        setProduct_id(product[0].id);
                    } else {
                        setName(product[0].name);
                        setDescription(product[0].description);
                    }
                } else {
                    setName('');
                    setDescription('');
                    setQuantity('');
                    setPrice('');
                    setProduct_id('');
                    setInventory_id('');
                }
            } catch (error) {
                console.log(error);

            }
        });
        setScannedCode(code);
    }

    async function Confirm() {
        const productCollection = database.get<Products>('products');

        await database.write(async () => {
            try {
                if (inventory_id.length > 0) {
                    console.log('updating', inventory_id);
                    const _product = await productCollection.find(product_id);
                    await _product.update((product) => {
                        product.name = _name;
                        product.description = _description;
                        product.barcode = scannedCode;
                    });

                    const _inventory = await inventoryCollection.find(inventory_id);
                    await _inventory.update((inventory) => {
                        inventory.price = _price;
                        inventory.stock = _quantity;
                    });
                    console.log('updated');
                } else if (product_id.length > 0) {
                    const _product = await productCollection.find(product_id);
                    await _product.update((product) => {
                        product.name = _name;
                        product.description = _description;
                        product.barcode = scannedCode;
                    });

                    const _inventory = await inventoryCollection.create((inventory) => {
                        inventory.price = _price;
                        inventory.stock = _quantity;
                        inventory.business.set(null);
                        inventory.productId = product_id;
                    });
                    console.log('inventory created');
                } else {
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
                    console.log('product and inventory created');
                }
            } catch (error) {
                console.log('Opps', error);
            }

            setName('');
            setDescription('');
            setQuantity('');
            setPrice('');
            setScannedCode('');
        });
    }

    function scanAgain(): void {
        setScannedCode('');
        setName('');
        setDescription('');
        setQuantity('');
        setPrice('');
    }

    return (<View>
        <BarCodeScanner aspectRatio={4 / 2}
            shifts={{ x: 50, y: 200 }}
            _onCodeScanned={handleCodeScanned}
        />
        <View padding="$4" space="$4">
            <Text fontWeight="bold" fontSize="$6">Scanned Product</Text>
            
            <View >

                <YStack space>
                    <XStack space="$4">
                        <Input 
                            placeholder="Product Barcode"
                            flex={1}
                            value={scannedCode}
                            editable={false}
                            onChangeText={setScannedCode}
                        />
                    </XStack>
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
                            onChangeText={(text) => setQuantity(text)}
                        />
                        <Button
                            px="$3"
                            py="$2"
                            onPress={() => setQuantity(`${+_quantity - 1}`)}
                        >
                            <Minus />
                        </Button>
                        <Button
                            px="$3"
                            py="$2"
                            onPress={() => setQuantity(`${+_quantity + 1}`)}
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
                            onChangeText={(text) => setPrice((text))}
                        />
                    </XStack>
                </YStack>
            </View>
            <XStack space="$4">
                <Button
                    flex={1}
                    theme="alt1"
                    onPress={scanAgain}
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
        </View>
    </View>)
}