import { useState } from "react";
import { Button, Input, Text, View, XStack, YStack } from "tamagui";

export default function ScanedItem() {
    const [quantity, setQuantity] = useState(1);
    const pricePerItem = 12.50;
    const stockLevel = 12; // Assuming stock level is 12 for this example
    const totalPrice = (quantity * pricePerItem).toFixed(2);

    const handleIncrement = () => {
        if (quantity < stockLevel) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        setQuantity(quantity > 1 ? quantity - 1 : 1);
    };

    const handleChange = (text: string) => {
        const parsedQuantity = parseInt(text) || 1;
        if (parsedQuantity <= stockLevel) {
            setQuantity(parsedQuantity);
        } else {
            setQuantity(stockLevel);
        }
    };

    return (
        <View borderRadius={8} bg='$background' p='$2.5'>
            <XStack jc='space-between'>
                <Text fontSize={20} fontWeight='600'>Tamagui UI</Text>
                <Text fontSize={18}>GHC {totalPrice}</Text>
            </XStack>

            <XStack jc='space-between'>
                <YStack>
                    <Text>{stockLevel} in stock</Text>
                    <Text>6 156000 043821</Text>
                </YStack>
                <XStack gap='$1'>
                    <Button size='$3' onPress={handleDecrement}>-</Button>
                    <Input size='$3' value={quantity.toString()} onChangeText={handleChange} />
                    <Button size='$3' onPress={handleIncrement}>+</Button>
                </XStack>
            </XStack>
        </View>
    );
}