import { useState } from 'react';
import { Text, View, Input, Button, Checkbox, XStack, YStack } from 'tamagui';
import { useFonts } from 'expo-font';
import { Check, Eye, EyeOff, Mail, Phone, User } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { supabase } from 'lib/supabase';

export default function AccountCreation() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  async function handleContinue() {
    const {data, error} = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        }
      },
    })

    if (error) {
      alert(error.message)
      return
    }
    console.log(data)
    router.replace('/(auth)/Login') // Using replace to prevent user from going back to the login page
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    }}>
      <YStack flex={1} backgroundColor="white" space="$4">
        <YStack space="$2" marginTop="$8">
          <Text fontSize={32} fontWeight="bold" color="$blue10">
            Create a new account
          </Text>
          <Text fontSize={16} color="$gray11">
            Create an account so you can manage your sales, inventory and finance efficiently
          </Text>
        </YStack>

        <YStack space="$4" marginTop="$4">
          <XStack alignItems="center" backgroundColor="$gray3" borderRadius="$4" px='$3' py='$1.5'>
            <User color="$gray11" size={24} />
            <Input
              flex={1}
              placeholder="Full Name"
              backgroundColor="transparent"
              borderWidth={0}
              paddingLeft="$2"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </XStack>

          <XStack alignItems="center" backgroundColor="$gray3" borderRadius="$4" px='$3' py='$1.5'>
            <Mail color="$gray11" size={20} />
            <Input
              flex={1}
              placeholder="Email"
              backgroundColor="transparent"
              borderWidth={0}
              paddingLeft="$2"
              keyboardType="phone-pad"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </XStack>

          <XStack alignItems="center" borderRadius="$4" space>
            <Input
              flex={1}
              placeholder="Password"
              secureTextEntry={!showPassword}
              backgroundColor="$gray3"
              borderWidth={0}
              py='$2'
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              circular
              // backgroundColor="transparent"
              onPress={() => setShowPassword(!showPassword)}
              icon={showPassword ? <EyeOff size={20} color="$gray11" /> : <Eye size={20} color="$gray11" />}
            />
          </XStack>
        </YStack>

        <XStack alignItems="center" space="$2">
          <Checkbox checked={agreed} onCheckedChange={(checked) => setAgreed(checked === true)}>
            <Checkbox.Indicator>
              <Text>✓</Text>
            </Checkbox.Indicator>
          </Checkbox>
          <Text>
            I agree to the <Text color="$blue10">Terms of Service</Text> and{' '}
            <Text color="$blue10">Privacy Policy</Text>
          </Text>
        </XStack>

        <Button
          backgroundColor="$blue10"
          color="white"
          borderRadius="$4"
          height={50}
          marginTop="$4"
          opacity={!agreed || name.length == 0 || email.length == 0 || password.length == 0 ? 0.5 : 1}
          disabled={!agreed || name.length == 0 || email.length == 0 || password.length == 0}
          onPress={handleContinue}
        >
          Continue
        </Button>

        <YStack alignItems="center" marginTop="$4">
          <Text color="$gray11">OR</Text>
        </YStack>

        <Button
          backgroundColor="white"
          borderColor="$gray6"
          borderWidth={1}
          color="$gray11"
          borderRadius="$4"
          height={50}
          marginTop="$4"
        >
          <XStack alignItems="center" space="$2">
            <Text fontSize={24} color="red">G</Text>
            <Text>Continue with Google</Text>
          </XStack>
        </Button>

        <XStack space="$2" marginTop="auto">
          <Text color="$gray11">Already have an account?</Text>
          <Pressable onPress={() => router.navigate('/(auth)/Login')}>
            <Text color="$blue10">Login</Text>
          </Pressable>
        </XStack>
      </YStack>
    </View>
  );
}