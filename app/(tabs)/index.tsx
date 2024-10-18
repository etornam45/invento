import { Paragraph, View } from 'tamagui';
import DailySales from 'components/cards/dailysales';
import SalesCard, { salesData } from 'components/cards/SalesCard';
import { FlatList } from 'react-native';

export default function TabOneScreen() {
  const renderDailySales = () => (
    <View>
      <FlatList
        data={[{}, {}, {}]} // Dummy data to render two DailySales components
        style={{ paddingRight: 16 }}
        renderItem={() => <DailySales />}
        keyExtractor={(item, index) => `daily-sales-${index}`} // Use a unique key for DailySales
        horizontal
        showsHorizontalScrollIndicator={false}
      />
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
    <View>
      {renderDailySales()}
      <Paragraph p='$3.5' fontWeight='900' fontSize={16}>
        Recent Activities
      </Paragraph>
      <FlatList
        data={salesData}
        style={{ paddingLeft: 16,  paddingRight: 16, marginBottom: 36 }}
        renderItem={renderRecentActivities}
        keyExtractor={(item) => `${Math.random() * 10000}`} // Ensure each timestamp is unique
        contentContainerStyle={{ paddingBottom: 16 }} // Add padding for better visibility
      />
    </View>
  );
}
