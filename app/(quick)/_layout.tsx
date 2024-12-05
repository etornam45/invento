import { Link, Stack } from "expo-router";
import { SolarAddCircleBold } from "icons/plus";
import { Pressable } from "react-native";

export default function Layout() {
    return <Stack>
        <Stack.Screen
            name="new_inventory"
            options={{
                title: 'New Inventory',
                // headerShown: false,
                presentation: 'modal',
            }}
        />
        <Stack.Screen
            name="SalesScanner"
            options={{
                title: 'Sales Scanner',
                // headerShown: false,
                presentation: 'modal',
            }}
        />
    </Stack>;
}