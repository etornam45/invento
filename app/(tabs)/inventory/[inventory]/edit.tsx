import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import database, { inventoryCollection } from 'model';
import { withObservables } from '@nozbe/watermelondb/react';
import Inventory from 'model/db/inventory';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, Input, SheetScrollView, Text, TextArea, View, XStack, YStack } from 'tamagui';
import Products from 'model/db/products';
import { Barcode, DollarSign, Save, TextCursorInput } from '@tamagui/lucide-icons';


const InventoryEditPage = () => {
    const local: { inventory: string } = useLocalSearchParams();
    const [inventory, setInventory] = useState<Inventory | null>(null);
    const [product, setProduct] = useState<Products | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Form data
    const [quantity, setQuantity] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [productDescription, setProductDescription] = useState<string>('');
    const [barcode, setBarcode] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await database.write(async () => {
                const inv = await inventoryCollection.find(local.inventory);
                const prod = await inv?.product.fetch();

                setProductName(prod?.name || '');
                setProductDescription(prod?.description || '');
                setQuantity(inv?.stock.toString() || '');
                setPrice(inv?.price.toString() || '');
                setBarcode(prod?.barcode || '');

                setInventory(inv);
                setProduct(prod);
            });
            setLoading(false);
        };
        fetchData();
    }, [local.inventory]);

    async function handleSave() {

        if (!inventory || !product) return;

        if (productName.trim() === '' || productDescription.trim() === '' || quantity.trim() === '' || price.trim() === '') {
            return;
        }

        await database.write(async () => {
            await inventory?.update((inv) => {
                inv.stock = parseInt(quantity);
                inv.price = parseFloat(price);
            })

            await product?.update((prod) => {
                prod.barcode = barcode;
                prod.name = productName;
                prod.description = productDescription;
            });
        });

        // Go back
        router.back();
    }

    return (
        <SheetScrollView p='$3' gap='$3' >
            <View gap='$3'>
                <Text
                    fontSize={20}
                    fontWeight='bold'
                >Edit Inventory </Text>
                <Text fontSize={14} color='gray'>
                    Please edit the inventory details below
                </Text>
            </View>
            {/* Form */}
            <View gap='$3' mt='$3'>
                <YStack>
                    <XStack flex={1} ai={'center'} gap='$2'>
                        <Barcode size={20} />
                        <Input flex={1} placeholder="Barcode" value={barcode} onChangeText={setBarcode} />
                    </XStack>
                </YStack>
                <YStack>
                    <XStack flex={1} ai={'center'} gap='$2'>
                        <TextCursorInput size={20} />
                        <Input flex={1} placeholder="Product Name" value={productName} onChangeText={setProductName} />
                    </XStack>
                </YStack>
                <YStack>
                    <XStack flex={1} ai={'flex-start'} gap='$2'>
                        <TextCursorInput size={20} />
                        <TextArea
                            rows={10}
                            flex={1} placeholder="Product Description" value={productDescription} onChangeText={setProductDescription} />
                    </XStack>
                </YStack>
                <YStack>
                    <XStack flex={1} ai={'center'} gap='$2'>
                        <Text
                            fontSize={14}
                            // color='gray'
                            fontWeight={'bold'}
                        >
                            QT
                        </Text>
                        <Input flex={1} placeholder="Quantity" keyboardType='numeric' returnKeyType='done' dataDetectorTypes={'all'} value={quantity} onChangeText={(text) => setQuantity(text)} />
                    </XStack>
                </YStack>
                <YStack>
                    <XStack flex={1} ai={'center'} gap='$2'>
                        <DollarSign size={20} />
                        <Input flex={1} placeholder="Price" value={price.toString()} keyboardType='numeric' onChangeText={(text) => setPrice(text)} />
                    </XStack>
                </YStack>
            </View>

            <View gap='$3' mt='$3'>
                <Button bg='$blue10' onPress={handleSave}>
                    <Save size={20} color={'white'}/>
                    <Text color={'white'} fontSize={18}>Save</Text>
                </Button>
            </View>
        </SheetScrollView>
    );
}


export default InventoryEditPage;