import { Link, Tabs, useRouter } from 'expo-router'
import { Button, useTheme, View } from 'tamagui'
import { Atom, AudioWaveform, BadgeCent, BadgePercent, Box, Camera, DollarSign, Home, ShoppingCart } from '@tamagui/lucide-icons'
import { Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SolarHomeAngleBold } from 'icons/home'
import { SolarChatRoundMoneyBold } from 'icons/sales'
import { SolarBoxMinimalisticBold } from 'icons/box'
import { SolarMoneyBagBold } from 'icons/wallet'
import { SolarQrCodeBold } from 'icons/code_scanner'


export default function TabLayout() {
  const theme = useTheme()
  const router = useRouter();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  useEffect(() => {
    async function checkOnboarding() {
      const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
      setIsComplete(onboardingComplete === 'true')
      // if (onboardingComplete !== 'true') {
      if (true) {
        setIsComplete(true);
        router.navigate('/OnboardingScreen');
        console.log('checking onboarding');
      }
    }
    
    checkOnboarding();
    console.log('checking onboarding');
  }, []);

  /**
   * If onboarding is not complete, return an empty view.
   */

  // if (!isComplete) {
  //   return (<View></View>)
  // }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
        },
        headerStyle: {
          backgroundColor: theme.background.val,
          borderBottomColor: theme.borderColor.val,
        },
        headerTintColor: theme.color.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <SolarHomeAngleBold width={24} height={24} fill={color} />,
        }}
      />
      <Tabs.Screen
        name='sales'
        options={{
          title: 'Sales',
          tabBarIcon: ({ color }) => <SolarChatRoundMoneyBold width={24} height={24} fill={color} />,
          headerRight: () => (
            <Link href="/SalesScanner" asChild>
              <Pressable>
                {({ pressed }) => (
                  <SolarQrCodeBold width={24} height={24}  marginRight={16} />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color }) => <SolarBoxMinimalisticBold fill={color} />,
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: 'Finance',
          tabBarIcon: ({ color }) => <SolarMoneyBagBold width={24} height={24}  fill={color} />,
        }}
      />
      
    </Tabs>
  )
}
