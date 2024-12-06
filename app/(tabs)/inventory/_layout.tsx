import { Link, Stack } from "expo-router";
import { SolarAddCircleBold } from "icons/plus";
import { Pressable } from "react-native";

export default function Layout() {
    return <Stack>
        <Stack.Screen
            name="index"
            options={{
                title: 'Inventory',
                headerRight: () => (
                    <Link href="/(quick)/new_inventory" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <SolarAddCircleBold width={24} height={24} fill='gray' />
                            )}
                        </Pressable>
                    </Link>
                ),
            }}
        />
        <Stack.Screen
            name="[inventory]"
            options={{
                title: 'Inventory Details',
                headerShown: false,
                presentation: 'modal',
            }}
        />
    </Stack>;
}