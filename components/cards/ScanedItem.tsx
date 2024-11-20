import { withObservables } from "@nozbe/watermelondb/react";
import { scannedItemsStore } from "lib/stores/scannedItems";
import Inventory from "model/db/inventory";
import Products from "model/db/products";
import { useState } from "react";
import { Button, Input, Text, View, XStack, YStack } from "tamagui";

const ScanedItem = ({inventory, product}: {inventory: Inventory, product: Products}) => {
    const {increaseQuantity, decreaseQuantity, getItem, remove} = scannedItemsStore();

    return (
        <View borderRadius={8} bg='$background' p='$2.5'>
            <XStack jc='space-between'>
                <Text fontSize={20} fontWeight='600'>{product.name}</Text>
                <Text fontSize={18}>GHC {getItem(inventory).price * getItem(inventory).quantity}</Text>
            </XStack>

            <XStack jc='space-between'>
                <YStack>
                    <Text>{inventory.stock} in stock</Text>
                </YStack>
                <XStack gap='$1'>
                    <Button size='$3' onPress={() => decreaseQuantity(inventory, 1)}>-</Button>
                    <Input size='$3' value={getItem(inventory).quantity.toString()} />
                    <Button size='$3' onPress={() => increaseQuantity(inventory, 1)}>+</Button>
                </XStack>
            </XStack>
        </View>
    );
}


const enhance = withObservables(['inventory'], ({ inventory }) => ({
    inventory,
    product: inventory.product
}));

export default enhance(ScanedItem);