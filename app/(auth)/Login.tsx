import { useState } from 'react';
import { YStack, XStack, Text, Input, Button } from 'tamagui';
import { useFonts } from 'expo-font';
import { Phone, Eye, EyeOff } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

export default function WelcomePage() {
    const router = useRouter();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [fontsLoaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    });

    const [showPassword, setShowPassword] = useState(false);

    if (!fontsLoaded) {
        return null;
    }

    function handleContinue() {
    }

    return (
        <YStack flex={1} padding="$4" backgroundColor="white" space="$4">
            <YStack space="$2" marginTop="$8">
                <Text fontSize={32} fontWeight="bold" color="$blue10">
                    Welcome
                </Text>
                <Text fontSize={16} color="$gray11">
                    Create an account so you can manage your sales, inventory and finance efficiently
                </Text>
            </YStack>

            <YStack space="$4" marginTop="$4">
                <XStack alignItems="center" backgroundColor="$gray3" borderRadius="$4" padding="$1.5" px='$3'>
                    <Phone color="$gray11" size={20} />
                    <Input
                        flex={1}
                        placeholder="Phone Number"
                        backgroundColor="transparent"
                        borderWidth={0}
                        paddingLeft="$2"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                    />
                </XStack>

                <XStack alignItems="center">
                    <XStack flex={1} alignItems="center" backgroundColor="$gray3" borderRadius="$4" padding="$1.5" >
                        <Input
                            flex={1}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            backgroundColor="transparent"
                            borderWidth={0}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </XStack>
                    <Button
                        // size="$3"
                        circular
                        icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        onPress={() => setShowPassword(!showPassword)}
                        marginLeft="$2"
                        backgroundColor="$gray3"
                    />
                </XStack>
            </YStack>

            <Button
                backgroundColor="$blue10"
                color="white"
                borderRadius="$4"
                height={50}
                marginTop="$4"
                onPress={handleContinue}
            >
                Continue
            </Button>

            <YStack alignItems="center" marginTop="$4">
                <Text color="$gray11">OR</Text>
            </YStack>

            <Button
                backgroundColor="white"
                borderColor="$gray5"
                borderWidth={1}
                color="$gray11"
                borderRadius="$4"
                height={50}
                marginTop="$4"
                icon={<Text fontSize={20}>G</Text>}
            >
                <Text marginLeft="$2">Continue with Google</Text>
            </Button>
        </YStack>
    );
}