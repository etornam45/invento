import { Stack } from 'expo-router';
import { Link } from 'expo-router'
import { SolarQrCodeBold } from 'icons/code_scanner';
import { Pressable } from 'react-native';


export default function Layout() {
    return <Stack>
        <Stack.Screen
            name="index"
            options={{
                title: 'Sales',
                headerRight: () => (
                    <Link href="sales/SalesScanner" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <SolarQrCodeBold width={24} height={24} marginRight={16} />
                            )}
                        </Pressable>
                    </Link>
                ),
            }}
        />
        <Stack.Screen
            name="[sales]"
            options={{
                title: 'Sale Details',
            }}
        />
    </Stack>;
}
