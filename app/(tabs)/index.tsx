import { Paragraph, ScrollView, View, XStack, YStack } from 'tamagui';
import SalesCard from 'components/cards/SalesCard';
import { FlatList, Pressable, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import DailySalesChart from 'components/cards/dailysales';
import SoldItems from 'components/cards/soldItems';
import InventoryCard from 'components/cards/InventoryCard';
import { Session } from '@supabase/supabase-js';
import { supabase } from 'lib/supabase';
import { router } from 'expo-router';
import database, { inventoryCollection, salesCollection, salesItemCollection } from 'model';
import SolarBoxBoldDuotone from 'icons/SolarBoxBoldDuotone';
import { SolarChatRoundMoneyBold } from 'icons/sales';
import SolarClipboardTextBoldDuotone from 'icons/SolarClipboardTextBoldDuotone';
import SolarMagniferLinear from 'icons/SolarMagniferLinear';
import { Q } from '@nozbe/watermelondb';
import { refreshStore } from 'lib/stores/refresh';

export default function Home() {

  const { refresh, pullMe} = refreshStore();

  useEffect(() => {
    // router.navigate('/(auth)/Login');
    supabase.auth.getSession().then(({ data: { session } }) => {
      UserLoggedIn(session);
    })

    supabase.auth.onAuthStateChange((_event, session) => {

      UserLoggedIn(session);
    })

    database.write(async () => {
      // const items = await salesItemCollection.query().fetch()
      // console.log(items)   
    })
  }, [])


  function UserLoggedIn(session: Session | null) {
    if (!session?.user) {
      console.log('User not logged in');
      router.navigate('/(auth)/Login');
      return;
    }
  }




  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={pullMe}
          />
      }
    >
      <DailySales />
      <QuickActions />
      <SalesSummary />
    </ScrollView>
  );
}


const QuickActions = () => {

  return (<XStack jc='space-between' p='$3.5'>
    <Pressable onPress={() => router.navigate('/(quick)/new_inventory')}>
      <YStack bg='$background' p='$3' br='$3'>
        <SolarBoxBoldDuotone width={24} height={24} fill={'#2dadda'} />
        <Paragraph>New Product</Paragraph>
      </YStack>
    </Pressable>
    <Pressable onPress={() => router.navigate('/(quick)/SalesScanner')}>
      <YStack bg='$background' p='$3' br='$3'>
        <SolarClipboardTextBoldDuotone width={24} height={24} fill={'#2dadda'} />
        <Paragraph>New Purchase</Paragraph>
      </YStack>
    </Pressable>
    <Pressable>
      <YStack bg='$background' p='$3' br='$3'>
        <SolarMagniferLinear width={24} height={24} stroke={'#2dadda'} fill={'none'} />
        <Paragraph>Find Product</Paragraph>
      </YStack>
    </Pressable>
  </XStack>)
}


const DailySales = () => {

  const { refresh } = refreshStore();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [dailySales, setDailySales] = useState<{
    name: string,
    value: number
  }[]>([]); // daily sales for the last 7 days ie. sales made in the same day are added together

  const [topItems, setTopItems] = useState<{
    name: string,
    value: number
  } []>([]);
  /**
   * Mon - 100 -> (sale_1 = 10) + (sale_2 = 90)
   */

  useEffect(() => {
    database.write(async () => {
      try {
        const sales = await salesCollection.query(
          Q.unsafeSqlQuery(
            `
              SELECT 
                strftime('%w', datetime(created_at / 1000, 'unixepoch')) AS weekday_number, 
                CASE strftime('%w', datetime(created_at / 1000, 'unixepoch'))
                    WHEN '0' THEN 'Sun'
                    WHEN '1' THEN 'Mon'
                    WHEN '2' THEN 'Tue'
                    WHEN '3' THEN 'Wed'
                    WHEN '4' THEN 'Thu'
                    WHEN '5' THEN 'Fri'
                    WHEN '6' THEN 'Sat'
                END AS name,
                SUM(total) AS value
            FROM sale
            WHERE datetime(created_at / 1000, 'unixepoch') >= DATE('now', '-7 days')
            AND created_at IS NOT NULL
            AND deleted = 0
            GROUP BY weekday_number
            ORDER BY weekday_number ASC;
        `
          )
        ).unsafeFetchRaw();
        console.log(sales)
        const data = days.map(day => {
          if (sales.find(sale => sale.name === day)) {
            return {
              name: day,
              value: sales.find(sale => sale.name === day).value
            }
          } else {
            return {
              name: day,
              value: 0
            }
          }
        })
        setDailySales(data)

        // Top 4 most sold items
        const topItems = await salesItemCollection.query(
          Q.unsafeSqlQuery(
            `
            SELECT 
              p.name, 
              SUM(si.quantity) AS value
            FROM sales_item si
            JOIN products p ON si.product_id = p.id
            GROUP BY p.name
            ORDER BY value DESC
            LIMIT 4;
          `
          )
        ).unsafeFetchRaw();

        console.log(topItems);
        setTopItems(topItems);
      } catch (error) {
        console.log(error)
      }
    })
  }, [refresh])



  return (<View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <DailySalesChart data={dailySales} />
      <SoldItems data={topItems} />
      <View style={{ width: 16 }} />
    </ScrollView>
  </View>)
};

const SalesSummary = () => {
  const { refresh } = refreshStore();

  const [totalStock, setTotalStock] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);


  useEffect(() => {
    database.write(async () => {
      const items = await inventoryCollection.query().fetch();
      const sales = await salesCollection.query().fetch();

      setTotalStock(items.map(item => item.stock).reduce((a, b) => a + b, 0));
      setLowStock(items.filter(item => item.stock < 10).length);
      setTotalSales(sales.map(sale => sale.total).reduce((a, b) => a + b, 0));
    })
  }, [refresh]);

  const Card = ({ title, value }) => (
    <View bg='$background' p='$3' br='$3'>
      <YStack>
        <Paragraph>{value}</Paragraph>
        <Paragraph>{title}</Paragraph>
      </YStack>
    </View>
  )
  return (
    <View p='$3' gap='$3' flex={4} mx='auto'>
      <Card title="Total Stock" value={totalStock + ' items'} />
      <Card title="Low Stock" value={lowStock + ' items'} />
      <Card title="Total Sales" value={'GHC ' + totalSales.toFixed(2)} />
      <Card title="Total Profit" value={totalProfit} />
    </View>
  )
}