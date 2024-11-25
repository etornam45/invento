import { TamaguiProvider, Theme, Text, View, XStack, YStack } from 'tamagui';
import { useFonts } from 'expo-font';

interface DailySalesChartProps {
    data: { name: string; value: number }[];
    tooltip?: string;
}

const DailySalesChart = ({ data, tooltip }: DailySalesChartProps) => {

    const maxValue = Math.max(...data.map((item) => item.value));

    return (
        <View p='$3.5'
        // mr='$3.5'
        w={'auto'}
        h={'auto'}
        // h='200'
        style={{ margin: 16, marginRight: 0,  }}
        flex={1}
        borderRadius={12}
        backgroundColor='$background'
        space
         >
            <Text fontWeight={'bold'} fontSize={16}>
                Daily Sales
            </Text>
            <XStack space="$2.5" ai='flex-end'>
                {data.map((item) => (
                    <YStack
                        key={item.name}
                        alignItems="center"
                        space="$2"
                        paddingVertical="$2"
                    >
                        <Text 
                        fontSize={11}
                        color="$gray11">₵{tooltip ? `${tooltip}: ${item.value}` : item.value}</Text>
                        <View
                            backgroundColor="$blue10"
                            // width={`${(item.value / maxValue) * 100}%`}
                            w='30'
                            height={(item.value / maxValue) * 90}
                            borderRadius={4}
                        />
                        <Text
                            fontSize={12}
                        color="$gray11">{item.name}</Text>
                    </YStack>
                ))}
            </XStack>
        </View>
    );
};

export default DailySalesChart;