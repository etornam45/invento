import { Q } from "@nozbe/watermelondb";
import BarCodeScanner from "components/BarCodeScanner";
import ScanedItem from "components/cards/ScanedItem";
import { scannedItemsStore } from "lib/stores/scannedItems";
import database, { inventoryCollection } from "model";
import Inventory from "model/db/inventory";
import { Fragment, useState } from "react";
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
                            {stripSeparator()}
                        </View>
                    )}
                    {Array.from(items).map((inv, index) => (
                        <Fragment key={index}>
                            <ScanedItem inventory={inv.inventory} />
                            {index < items.size - 1 && stripSeparator()}
                        </Fragment>
                    ))}
                </ScrollView>
                <View m='$3.5'>
                    <Button w='100%' h='50' bg='$blue10' color='$white' fontSize={20} fontWeight='600'>Checkout</Button>
                </View>
            </YStack>
        </View>
    );
}

const stripSeparator = () => {
    return (<XStack>
        <View w={15} h={15} bg='$gray4' borderRadius={15}
            style={{
                position: 'absolute', top: -7, left: -15,
            }} />
        <Separator />
        <View w={15} h={15} bg='$gray4' borderRadius={15}
            style={{
                position: 'absolute', top: -7, right: -15,
            }} />
    </XStack>)
}