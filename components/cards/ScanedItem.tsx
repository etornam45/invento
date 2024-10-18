import { Button, Input, Text, View, XStack, YStack } from "tamagui";

export default function ScanedItem() {
    return (<View borderRadius={8} bg='$background' p='$2.5'>
        <XStack jc='space-between'>
            <Text fontSize={20} fontWeight='600'>Tamagui UI</Text>
            <Text fontSize={18}>GHC 12.50</Text>
        </XStack>

        <XStack jc='space-between'>
            <YStack>
                <Text>12 in stock</Text>
                <Text>6 156000 043821</Text>
            </YStack>
            <XStack gap='$1'>
                <Button size='$3'>-</Button>
                <Input size='$3' value={"1"} />
                <Button size='$3'>+</Button>
            </XStack>
        </XStack>
    </View>)
}