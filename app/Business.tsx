import { YStack, XStack, Text, Input, Button } from 'tamagui';
import { useFonts } from 'expo-font';
import { Home, MapPin } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

export default function CustomizeStore() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    function handleContinue() {
        // Implement continue functionality
        router.navigate('/Login');
    }

    return (
        <YStack flex={1} padding="$4" backgroundColor="white" space="$4">
            <YStack space="$2">
                <Text fontSize={24} fontWeight="bold" color="$blue10">
                    Customize your store
                </Text>
                <Text fontSize={16} color="$gray11">
                    Customize your store to get the best experience
                </Text>
            </YStack>

            <XStack alignItems="center" backgroundColor="$gray3" borderRadius="$4" padding="$1.5" px='$3'>
                <Home color="$gray11" size={20} />
                <Input
                    flex={1}
                    placeholder="Business Name"
                    backgroundColor="transparent"
                    borderWidth={0}
                    paddingLeft="$2"
                />
            </XStack>

            <XStack alignItems="center" backgroundColor="$gray3" borderRadius="$4" padding="$1.5" px='$3'>
                <MapPin color="$gray11" size={20} />
                <Input
                    flex={1}
                    placeholder="Country"
                    backgroundColor="transparent"
                    borderWidth={0}
                    paddingLeft="$2"
                />
            </XStack>

            <Button
                backgroundColor="$blue10"
                color="white"
                borderRadius="$4"
                height={50}
                marginTop="auto"
                onPress={handleContinue}
            >
                Continue
            </Button>
        </YStack>
    );
}