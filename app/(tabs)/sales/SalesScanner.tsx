import { Q } from "@nozbe/watermelondb";
import BarCodeScanner from "components/BarCodeScanner";
import ScanedItem from "components/cards/ScanedItem";
import StripSeparator from "components/strip_separators";
import { scannedItemsStore } from "lib/stores/scannedItems";
import database, { inventoryCollection, salesCollection, salesItemCollection } from "model";

import { Fragment } from "react";
import { Button, ScrollView, Separator, Text, View, XStack, YStack } from "tamagui";

export default function SalesScanPage() {
    const {items, add} = scannedItemsStore();

    function handleCodeScanned(code: string) {
        database.write(async () => {
            try {
                const prod = await inventoryCollection.query(Q.on('products', 'barcode', code)).fetch()
                if (prod.length > 0) {
                    add({inventory: prod[0], quantity: 1, price: prod[0].price})
                }
            } catch (error) {
                console.log(error)
            }
        })
    }

    async function checkOut() {
        await database.write(async() => {
            try {
                const _sales = await salesCollection.create((sale) => {
                    sale.total = Array.from(items).reduce((acc, item) => acc + item.price * item.quantity, 0)
                    sale.quantity = Array.from(items).reduce((acc, item) => acc + item.quantity, 0)
                    sale.payment = 'cash'
                })
                console.log(_sales)

                for (const item of items) {
                    const __item = await salesItemCollection.create((saleItem) => {
                        saleItem.quantity = item.quantity
                        saleItem.price = item.price
                        saleItem.productId = item.inventory.productId
                        saleItem.saleId = _sales.id
                        saleItem.inventoryId = item.inventory.id
                    })

                    await item.inventory.update((inv) => {
                        inv.stock -= item.quantity
                    }).then(() => {
                        console.log('Inventory updated')
                    }).catch((error) => {
                        console.log(error)
                    })

                    console.log(__item.price, __item.quantity)
                }

            } catch (error) {
                console.log(error)
            }
        })
    }

    return (
        <View w='100%' flex={1}>
            <BarCodeScanner aspectRatio={5 / 2} _onCodeScanned={handleCodeScanned} />
            <View>
                <XStack w='100%' jc='space-between' py='$1.5'>
                    <Text fontSize={20} ml='$3.5' fontWeight='600'>Scanned Items</Text>
                    <Text mr='$3.5'>3 items</Text>
                </XStack>
            </View>
            <YStack flex={1} jc='space-between'>
                <ScrollView p='$2.5' m='$3.5' borderRadius={12} backgroundColor='$background'>
                    {items.size === 0 && (
                        <View>
                            <Text fontSize={20} fontWeight='500' mb='$2.5' textAlign='center'>Scan an item to add to cart</Text>
                            {<StripSeparator/>}
                        </View>
                    )}
                    {Array.from(items).map((inv, index) => (
                        <Fragment key={index}>
                            <ScanedItem inventory={inv.inventory} />
                            {index < items.size - 1 && <StripSeparator/>}
                        </Fragment>
                    ))}
                </ScrollView>
                <View m='$3.5'>
                    <Button onPress={checkOut} w='100%' h='50' bg='$blue10' color='$white' fontSize={20} fontWeight='600'>Checkout</Button>
                </View>
            </YStack>
        </View>
    );
}

