import { Separator, View, XStack } from "tamagui";

const StripSeparator = () => {
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

export default StripSeparator;