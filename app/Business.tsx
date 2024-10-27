import { YStack, XStack, Text, Input, Button } from 'tamagui';
import { useFonts } from 'expo-font';
import { Home, MapPin } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { addBusiness, getBusiness, getBusinesses } from 'utils/db/business';
import { users$ } from 'utils/db/users';
import { UserState$ } from 'utils/state/user';

export default function CustomizeStore() {
    const router = useRouter();
    const [business_name, setBusinessName] = useState('');
    const [country, setCountry] = useState('');
    const [fontsLoaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    function handleContinue() {
        // Implement continue functionality
        if (!business_name || !country) {
            return;
        }
        console.log('Creating business');
        let user = UserState$.getUser();
        console.log({
            name: business_name,
            city: country,
            user_id: user.id,
            phone: user.phone ?? ''
        })
        addBusiness({
            name: business_name,
            city: country,
            user_id: user.id,
            phone: user.phone ?? ''
        });

        console.log('Business created');
        console.log(getBusinesses());
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
                    value={business_name}
                    onChangeText={setBusinessName}
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
                    value={country}
                    onChangeText={setCountry}
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