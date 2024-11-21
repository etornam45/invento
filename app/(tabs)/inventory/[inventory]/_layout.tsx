import { Link, Stack, useLocalSearchParams } from "expo-router";
import SolarPenBoldDuotone from "icons/SolarPenBoldDuotone";
import { Pressable } from "react-native";

export default function Layout() {
    const local = useLocalSearchParams() as { inventory: string };

    return <Stack>
        <Stack.Screen
            name="index"
            options={{
                title: 'Inventory Details',
                headerRight: () => (
                    <Link href={`/inventory/${local.inventory}/edit`} asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <SolarPenBoldDuotone width={20} height={20} fill='grey' />
                            )}
                        </Pressable>
                    </Link>
                ),
            }}
        />
        <Stack.Screen
            name="edit"
            options={{
                title: 'Edit Inventory',
                presentation: 'modal',
            }}
        />
    </Stack>;
}