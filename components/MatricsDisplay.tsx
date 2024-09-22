import { AreaChart, BarChart, PieChart } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { XStack, YStack, Text, Card, Button } from 'tamagui';

const MetricCard = ({ title, value, color }) => (
    <Card
        elevate
        size="$4"
        bordered
        width={150}
        height={100}
        backgroundColor={color}
        borderRadius="$4"
    >
        <YStack flex={1} justifyContent="space-between" padding="$3">
            <PieChart />
            <Text color="white" fontSize="$8" fontWeight="bold">
                {value}
            </Text>
            <Text color="white" fontSize="$3">
                {title}
            </Text>
        </YStack>
    </Card>
);

const TimeRangeSelector = ({ selectedRange, onRangeChange }) => {
    const ranges = ['1D', '1W', '1M', '3M', '6M', '1Y'];

    return (
        <XStack marginTop="$4" w="100%" gap="$1.5" ai="center" jc="space-between">
            {ranges.map((range) => (
                <Button
                    key={range}
                    size="$2.5"
                    theme={selectedRange === range ? 'blue_active' : 'gray'}
                    br="$14"
                    px="$2.5"
                    py="$1.5"
                    onPress={() => {
                        console.log('range', range);
                        onRangeChange(range)
                    }}
                >
                    {range}
                </Button>
            ))}
        </XStack>
    );
};

const MetricsDisplay = () => {
    const [selectedRange, setSelectedRange] = useState('1W');

    return (
        <Card p='$4' alignItems="center" elevate borderRadius="$4">
            <XStack ai="center" jc="space-between" gap="$2">
                <MetricCard title="Product In" value="3027" color="#007AFF" />
                <MetricCard title="Product Out" value="2698" color="#00B2FF" />
            </XStack>
            <TimeRangeSelector
                selectedRange={selectedRange}
                onRangeChange={setSelectedRange}
            />
        </Card>
    );
};

export default MetricsDisplay;