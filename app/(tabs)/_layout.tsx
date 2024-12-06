import { Link, Tabs, useRouter } from 'expo-router'
import { Text, useTheme, View } from 'tamagui'
import { Pressable } from 'react-native'
import { SolarHomeAngleBold } from 'icons/home'
import { SolarChatRoundMoneyBold } from 'icons/sales'
import { SolarBoxMinimalisticBold } from 'icons/box'
import { SolarMoneyBagBold } from 'icons/wallet'
import { SolarQrCodeBold } from 'icons/code_scanner'
import { SolarAddCircleBold } from 'icons/plus'
import SolarUserCircleBoldDuotone from 'icons/SolarUserCircleBoldDuotone'


export default function TabLayout() {
  const theme = useTheme()
  /**
   * If onboarding is not complete, return an empty view.
   */

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.blue9Dark.val,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
          padding: 5,
        },
        headerStyle: {
          backgroundColor: theme.background.val,
          borderBottomColor: theme.borderColor.val,
        },
        headerTintColor: theme.color.val,
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarHideOnKeyboard: true,
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
          tabBarIcon: ({ color }) => <SolarChatRoundMoneyBold width={24} height={24} fill={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color }) => <SolarBoxMinimalisticBold fill={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <SolarUserCircleBoldDuotone width={24} height={24} fill={color} />,
        }}
      />

    </Tabs>
  )
}
