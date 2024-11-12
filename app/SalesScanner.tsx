import BarCodeScanner from "components/BarCodeScanner";
import ScanedItem from "components/cards/ScanedItem";
import { Button, ScrollView, Separator, Text, View, XStack, YStack } from "tamagui";

export default function SalesScanPage() {
    return (<View w='100%' flex={1}>
        <BarCodeScanner aspectRatio={5 / 4} />
        <View >
            <XStack w='100%' jc='space-between' py='$1.5'>
                <Text fontSize={20} ml='$3.5' fontWeight='600'>Scanned Items</Text>
                <Text mr='$3.5'>3 items</Text>
            </XStack>
        </View>
        <YStack flex={1} jc='space-between'>
            <ScrollView p='$2.5' m='$3.5' borderRadius={12} backgroundColor='$background'>
                <ScanedItem />
                {stripSeparator()}
                <ScanedItem />
                {stripSeparator()}
                <ScanedItem />
                {stripSeparator()}
                <ScanedItem />
                {stripSeparator()}
                <ScanedItem />
            </ScrollView>
            <View m='$3.5'>
                <Button w='100%' h='50' bg='$blue10' color='$white' fontSize={20} fontWeight='600'>Checkout</Button>
            </View>
        </YStack>
    </View>)
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