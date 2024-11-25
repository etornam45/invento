import { useEffect, useState } from 'react';
import { YStack, XStack, Text, Input, Button, Anchor } from 'tamagui';
import { useFonts } from 'expo-font';
import { Phone, Eye, EyeOff, Mail } from '@tamagui/lucide-icons';
import { supabase } from 'lib/supabase';
import { router } from 'expo-router';

export default function WelcomePage() {

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                router.replace('/(tabs)')
                return
            }
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                router.replace('/(tabs)') 
                return
            }
        })
    })

    /**TODO
     * Remove the above code to prevent future bugs 
     * Where user is redirected back and 
     * forth between the login page and the home page
     */

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [fontsLoaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    });

    const [showPassword, setShowPassword] = useState(false);

    if (!fontsLoaded) {
        return null;
    }

    async function handleContinue() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            alert(error.message === 'Email not confirmed' ? 'Please confirm your email before logging in' : error.message)
            return
        }

        router.replace('/(tabs)') // Using replace to prevent user from going back to the login page
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
                    <Mail color="$gray11" size={20} />
                    <Input
                        flex={1}
                        placeholder="Email eg. example@gmail.com"
                        backgroundColor="transparent"
                        borderWidth={0}
                        paddingLeft="$2"
                        keyboardType="phone-pad"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
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
            <Text color="$gray11" textAlign="center" marginTop="$4">
                Don't have an account?{' '}
                <Anchor onPress={() => router.push('/(auth)/Register')} color="$blue10" marginTop="$4">
                    Create an account
                </Anchor>
            </Text>
        </YStack>
    );
}