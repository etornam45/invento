import { Link, Tabs, useRouter } from 'expo-router'
import { Button, useTheme } from 'tamagui'
import { Atom, AudioWaveform, BadgeCent, BadgePercent, Box, Camera, DollarSign, Home, ShoppingCart } from '@tamagui/lucide-icons'
import { Pressable } from 'react-native'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TabLayout() {
  const theme = useTheme()
  const router = useRouter();

  useEffect(() => {
    async function checkOnboarding() {
      const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
      if (onboardingComplete !== 'true') {
        router.replace('/OnboardingScreen');
      }
    }

    checkOnboarding();
  }, [router]);
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
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name='sales'
        options={{
          title: 'Sales',
          tabBarIcon: ({ color }) => <BadgePercent color={color} />,
          headerRight: () => (
            <Link href="/SalesScanner" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Camera mr='$3.5'/>
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
          tabBarIcon: ({ color }) => <Box color={color} />,
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: 'Finance',
          tabBarIcon: ({ color }) => <BadgeCent color={color} />,
        }}
      />
      
    </Tabs>
  )
}
