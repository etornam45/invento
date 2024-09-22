import React, { useState } from 'react';
import { View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { YStack, XStack, Text, Card } from 'tamagui';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { Circle, G, Line, Rect, Text as SVGText } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

interface DataPoint {
  value: number;
  day: string;
}

const data: DataPoint[] = Array.from({ length: 7 }, (_, index) => ({
  value: Math.floor(Math.random() * 40000) + 100,
  day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
}));

interface TooltipProps {
  x: (index: number) => number;
  y: (value: number) => number;
  data: DataPoint[];
  selectedIndex: number | null;
}



const Tooltip: React.FC<TooltipProps> = ({ x, y, data, selectedIndex }) => {
  if (selectedIndex === null) return null;

  const item = data[selectedIndex];
  return (
    <G x={x(selectedIndex)} y={y(item.value)}>
      <Circle r={5} fill="rgb(134, 65, 244)" />
      <G y={-30}>
        <Rect x={-30} y={-20} width={60} height={40} fill="black" opacity={0.8} rx={5} ry={5} />
        <SVGText x={0} y={-5} fill="white" textAnchor="middle" fontSize="12">
          {item.day}
        </SVGText>
        <SVGText x={0} y={15} fill="white" textAnchor="middle" fontSize="12">
          ${item.value}
        </SVGText>
      </G>
    </G>
  );
};

const RevenueChart: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePress = (event: any) => {
    const { locationX } = event.nativeEvent;
    const chartWidth = screenWidth - 60; // Adjust based on your padding
    const index = Math.round((locationX / chartWidth) * (data.length - 1));
    setSelectedIndex(index);
  };

  return (
    <Card width={screenWidth - 40} height={300} padding="$4">
      <YStack space="$2">
        <Text fontSize="$5" fontWeight="bold">Revenue</Text>
        <XStack>
          <Text fontSize="$8" fontWeight="bold">$27,003.98</Text>
          <Text fontSize="$4" color="green" marginLeft="$2">+7.6%</Text>
        </XStack>
        <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
            data={data.map(item => item.value)}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fontSize: 8, fill: 'grey' }}
            numberOfTicks={5}
            formatLabel={(value) => `$${value / 1000}k`}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <TouchableWithoutFeedback onPress={handlePress}>
              <LineChart
                style={{ flex: 1 }}
                data={data}
                yAccessor={({ item }) => item.value}
                xAccessor={({ index }) => index}
                contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
              >
                <Grid />
                {({ x, y }: { x: (index: number) => number, y: (value: number) => number }) => (
                  <Tooltip x={x} y={y} data={data} selectedIndex={selectedIndex} />
                )}
              </LineChart>
            </TouchableWithoutFeedback>
            <XAxis
              style={{ marginHorizontal: -10 }}
              data={data}
              formatLabel={(_, index) => data[index].day}
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 10, fill: 'grey' }}
            />
          </View>
        </View>
      </YStack>
    </Card>
  );
};

export default RevenueChart;