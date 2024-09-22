import { Link, Tabs } from 'expo-router'
import { Button, useTheme } from 'tamagui'
import { Atom, AudioWaveform, Home, ShoppingBag, Settings, PlusCircle, PackagePlus } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const theme = useTheme()

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
          headerRight: () => (
            <Link href="/modal" asChild>
              <PlusCircle
              mr={16}
              color={
                theme.color.val === theme.dark?.val ? theme.blue10.val : theme.red10.val
              } size={24} />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: 'Sales',
          tabBarIcon: ({ color }) => <AudioWaveform color={color} />,
          headerRight: () => (
            <Link href="/new_sale" asChild>
              <PlusCircle  size={24} color={theme.red10.val} mr={16} />
            </Link>
          ),
        }}
      />
      <Tabs.Screen 
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => <ShoppingBag color={color} />,
          headerRight: () => (
            <Link href={{ pathname: "/shop_new" }} asChild>
              <PackagePlus
              mr={16}
              color={
                theme.color.val === theme?.dark?.val ? theme.blue10.val : theme.red10.val
              } size={24} />
            </Link>
          ),
        }}
      />
      <Tabs.Screen 
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
    </Tabs>
  )
}
