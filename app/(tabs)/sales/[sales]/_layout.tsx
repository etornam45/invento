import { Link, Stack, useLocalSearchParams } from "expo-router";
import SolarPenBoldDuotone from "icons/SolarPenBoldDuotone";
import { Pressable } from "react-native";

export default function Layout() {
    const local: { sales: string } = useLocalSearchParams();
    console.log(local.sales);
    return <Stack>
        <Stack.Screen
            name="index"
            options={{
                title: 'Sales Details',
                headerRight: () => (
                    <Link href={`/sales/${local.sales}/edit`} asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <SolarPenBoldDuotone width={24} height={24} fill='grey' />
                            )}
                        </Pressable>
                    </Link>
                ),
            }}
        />
        <Stack.Screen
            name="sale_edit"
            options={{
                title: 'Edit Inventory',
                presentation: 'modal',
            }}
        />
    </Stack>;
}