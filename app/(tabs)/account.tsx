import { User } from '@supabase/supabase-js'
import { supabase } from 'lib/supabase'
import database, { inventoryCollection, productsCollection, salesCollection } from 'model'
import { useEffect, useState } from 'react'
import { Button, Image, Paragraph, ScrollView, Text, View, XStack, YStack } from 'tamagui'

export default function FinancePage() {
  const [user, setUser] = useState<User>()
  const [totalSales, setTotalSales] = useState<number>(0);
  const [lastReceived, setLastReceived] = useState<Date>(); // date
  const [totalInventory, setTotalInventory] = useState<number>(0);
  const [lowInventory, setLowInventory] = useState<number>(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user)
    }).catch(err => {
      console.log(err)
    })


    database.write(async () => {
      const items = await inventoryCollection.query().fetch();
      const sales = await salesCollection.query().fetch();

      setTotalSales(sales.map(sale => sale.total).reduce((a, b) => a + b, 0));
      setLastReceived(sales.map(sale => sale.createdAt).sort((a, b) => a.getTime() - b.getTime())[0]);
      setTotalInventory(items.map(item => item.stock).reduce((a, b) => a + b, 0));
      setLowInventory(items.filter(item => item.stock < 10).length);
    })
  }, [])

  return (
    <ScrollView>
      <YStack p='$4' space>
        <XStack space>
          <View>
            <Image source={{ uri: `https://api.dicebear.com/9.x/thumbs/png?seed=${user?.user_metadata.full_name}` }} style={{ width: 50, height: 50, borderRadius: 60 }} />
          </View>
          <YStack jc='space-between'>
            <Text fontSize={18}>Akwaba, {user?.user_metadata.full_name}</Text>
            <Text>{user?.email}</Text>
          </YStack>
        </XStack>
        <View bg='#2D91FF' h={180} br={15} p={15} jc={'space-between'}>
          <XStack jc={'space-between'}>
            <YStack>
              <Text color='#fff' fontSize={18}>Income</Text>
              <Text color='#fff' fontSize={28} fontWeight={'bold'} style={{
                fontFamily: 'Inter-Black'
              }}>GHC {totalSales.toFixed(2)}</Text>
            </YStack>
            <YStack ai='flex-end'>
              <Text color='#fff' fontSize={18}>Last received</Text>
              <Text color='#fff' fontSize={18}>{lastReceived?.toLocaleDateString()}</Text>
            </YStack>
          </XStack>
          <View>
            <Button bg='#fff' br={10} p={10} mt={10}>
              <Text color='#2D91FF' fontWeight='bold' >View Summary</Text>
            </Button>
          </View>
        </View>
        <XStack space='$3'>
          <View bg='#37474F' flex={1} br={15} p={15} jc={'space-between'}>
            <Text color='#fff' fontSize={18}>
              Low Inventory
            </Text>
            <Text color='#fff' fontSize={28} fontWeight={'bold'} style={{
              fontFamily: 'Inter-Black'
            }}>
              {lowInventory} units
            </Text>
            <Text color='#fff' fontSize={16}>
              units on low stock
            </Text>
          </View>
          <View bg='#37474F' flex={1} br={15} p={15} jc={'space-between'}>
            <Text color='#fff' fontSize={18}>
              Total Inventory
            </Text>
            <Text color='#fff' fontSize={28} fontWeight={'bold'} style={{
              fontFamily: 'Inter-Black'
            }}>
              {totalInventory} units
            </Text>
          </View>
        </XStack>
        <YStack space='$3'>
          <Paragraph
            fontSize={18}
            fontWeight='bold'
            style={{
              fontFamily: 'Inter-Black'
            }}
          >My Shops</Paragraph>
          <YStack space>
            <View bg='$background' br={15} p={15} jc={'space-between'}>
              <Text fontSize={18}>Kumasi Mall</Text>
              <Text fontSize={18}>+233 **** ***** 88</Text>
            </View>
            <View bg='$background' br={15} p={15} jc={'space-between'}>
              <Text fontSize={18}>Kumasi Mall</Text>
              <Text fontSize={18}>+233 **** ***** 88</Text>
            </View>
            <View bg='$background' br={15} p={15} jc={'space-between'}>
              <Text fontSize={18}>Kumasi Mall</Text>
              <Text fontSize={18}>+233 **** ***** 88</Text>
            </View>
            <View bg='$background' br={15} p={15} jc={'space-between'}>
              <Text fontSize={18}>Kumasi Mall</Text>
              <Text fontSize={18}>+233 **** ***** 88</Text>
            </View>
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
