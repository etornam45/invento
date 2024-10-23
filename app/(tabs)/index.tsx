import { Paragraph, ScrollView, View } from 'tamagui';
import DailySales from 'components/cards/dailysales';
import SalesCard, { salesData } from 'components/cards/SalesCard';
import { FlatList } from 'react-native';
import { useEffect } from 'react';
import DailySalesChart from 'components/cards/dailysales';
import SoldItems from 'components/cards/soldItems';

export default function Home() {

  useEffect(() => {
    console.log('Home screen mounted');
  }, []);

  const renderDailySales = () => (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DailySalesChart data={[
          { name: 'MON', value: 1500 },
          { name: 'TUE', value: 800 },
          { name: 'WED', value: 1200 },
          { name: 'THUR', value: 2000 },
          { name: 'FRI', value: 1800 },
          { name: 'SAT', value: 1400 },
          { name: 'SUN', value: 900 },
        ]} />
        <SoldItems />
        <View style={{ width: 16 }} />
      </ScrollView>
    </View>
  );

  const renderRecentActivities = ({ item }) => (
    <SalesCard
      name={item.name}
      badge={item.badge}
      paymentMethod={item.paymentMethod}
      quantity={item.quantity}
      salePrice={item.salePrice}
      timestamp={item.timestamp}
    />
  );

  return (
    <ScrollView>
      {renderDailySales()}
      <Paragraph p='$3.5' fontWeight='900' fontSize={16}>
        Recent Activities
      </Paragraph>
      <FlatList
        data={salesData}
        style={{ paddingLeft: 16, paddingRight: 16, marginBottom: 36 }}
        renderItem={renderRecentActivities}
        keyExtractor={(item) => `${Math.random() * 10000}`} // Ensure each timestamp is unique
        contentContainerStyle={{ paddingBottom: 16 }} // Add padding for better visibility
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
