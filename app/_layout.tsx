import '../tamagui-web.css'

import { useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from './Provider'
import { useTheme } from 'tamagui'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on /modal keeps a back button present.
  initialRouteName: '/(tabs)/index',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  )
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const theme = useTheme()



  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack>

        <Stack.Screen
          name='OnboardingScreen'
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name='Login'
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name='Register'
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name='Business'
          options={{
            // headerShown: false,
          }}
        />

        <Stack.Screen
          name='new_inventory'
          options={{
            title: 'New Inventory',
          }}
        />

        <Stack.Screen
          name='SalesScanner'
          options={{
            title: 'BarCode Scanner'
          }}
        />

        <Stack.Screen
          name="modal"
          options={{
            title: 'Tamagui + Expo',
            presentation: 'modal',
            animation: 'slide_from_right',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            contentStyle: {
              backgroundColor: theme.background.val,
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}
