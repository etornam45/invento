import { Paragraph, ScrollView, View } from 'tamagui';
import SalesCard, { salesData } from 'components/cards/SalesCard';
import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import DailySalesChart from 'components/cards/dailysales';
import SoldItems from 'components/cards/soldItems';
import InventoryCard from 'components/cards/InventoryCard';
import { Session } from '@supabase/supabase-js';
import { supabase } from 'lib/supabase';
import { router } from 'expo-router';

export default function Home() {

  useEffect(() => {
    // router.navigate('/(auth)/Login');
    supabase.auth.getSession().then(({ data: { session } }) => {
      UserLoggedIn(session);
    })

    supabase.auth.onAuthStateChange((_event, session) => {

      UserLoggedIn(session);
    })
  }, [])


  function UserLoggedIn(session: Session | null) {
    if (!session?.user) {
      console.log('User not logged in');
      router.navigate('/(auth)/Login');
      return;
    }
    console.log('User logged in');
  }

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

  const renderTopProducts = () => (
    <View
      style={{
        // paddingLeft: 16,
        // paddingRight: 16,
        // marginBottom: 16,
        backgroundColor: '#b7e8d1',
      }}
    >
      <Paragraph p='$3.5'
        py='$2.5'
        fontWeight='900' fontSize={16}>
        Top Products
      </Paragraph>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ width: 12 }} />
        <InventoryCard name='Crunchy Cookies' quantity={23} price={200} image={require('../../assets/images/Crunchy-cookies.png')} />
        <InventoryCard name='Chocolate Cookies' quantity={15} price={150} image={require('../../assets/images/Chocolate-cookies.png')} />
        <InventoryCard name='Vanilla Cookies' quantity={10} price={100} image={require('../../assets/images/Vanilla-cookies.png')} />
        <InventoryCard name='Strawberry Cookies' quantity={5} price={50} image={require('../../assets/images/Strawberry-cookies.png')} />
        <View style={{ width: 12 }} />
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
      {renderTopProducts()}
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
