import { Link, Tabs, useRouter } from 'expo-router'
import { Text, useTheme, View } from 'tamagui'
import { Pressable } from 'react-native'
import { SolarHomeAngleBold } from 'icons/home'
import { SolarChatRoundMoneyBold } from 'icons/sales'
import { SolarBoxMinimalisticBold } from 'icons/box'
import { SolarMoneyBagBold } from 'icons/wallet'
import { SolarQrCodeBold } from 'icons/code_scanner'
import { SolarAddCircleBold } from 'icons/plus'


export default function TabLayout() {
  const theme = useTheme()
  /**
   * If onboarding is not complete, return an empty view.
   */

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
          tabBarIcon: ({ color }) => <SolarChatRoundMoneyBold width={24} height={24} fill={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color }) => <SolarBoxMinimalisticBold fill={color} />,
          headerRight: () => (
            <Link href="/new_inventory" asChild>
              <Pressable>
                {({ pressed }) => (
                  <SolarAddCircleBold width={24} height={24}  marginRight={16} fill={theme.color.val} />
                )}
              </Pressable>
            </Link>
          ),
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
