import { YStack, XStack, Text, Input, Button } from 'tamagui';
import { useFonts } from 'expo-font';
import { Home, MapPin, Phone } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { supabase } from 'lib/supabase';
import database, { businessCollection } from 'model';

export default function CustomizeStore() {
    const router = useRouter();
    const [business_name, setBusinessName] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [fontsLoaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    async function handleContinue() {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            alert('Please login to continue')
            router.navigate('/(auth)/Login')
        }

        database.write(async () => {
            try {
                const business = await businessCollection.create((data) => {
                    data.name = business_name;
                    data.city = country;
                    data.userId = session?.user?.id;
                    data.phone = phone;
                });
    
                console.log(business)
                router.navigate('/(tabs)')
            } catch (error) {
                console.log(error)
            }
        })
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
                    placeholder="City"
                    backgroundColor="transparent"
                    borderWidth={0}
                    paddingLeft="$2"
                    value={country}
                    onChangeText={setCountry}
                />
            </XStack>
            <XStack alignItems="center" backgroundColor="$gray3" borderRadius="$4" padding="$1.5" px='$3'>
                <Phone color="$gray11" size={20} />
                <Input
                    flex={1}
                    placeholder="Phone Number"
                    backgroundColor="transparent"
                    borderWidth={0}
                    paddingLeft="$2"
                    value={phone}
                    onChangeText={setPhone}
                />
            </XStack>

            <Button
                backgroundColor="$blue10"
                color="white"
                borderRadius="$4"
                height={50}
                // marginTop="auto"
                onPress={handleContinue}
            >
                Continue
            </Button>
        </YStack>
    );
}