import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { switchMap } from "@nozbe/watermelondb/utils/rx";
import { BadgeCent, Barcode } from "@tamagui/lucide-icons";
import sales from "app/(tabs)/sales";
import { router } from "expo-router";
import { timeAgo } from "lib/utils";
import database, { salesCollection, salesItemCollection } from "model";
import Products from "model/db/products";
import Sale from "model/db/sales";
import SalesItem from "model/db/sales_item";
import { useEffect, useState } from "react";
import { from, map, toArray } from "rxjs";
import { Text, View, XStack, YStack } from "tamagui";

interface SalesCardProp {
  sale: Sale
  salesItemCount: SalesItem[]
}

const SalesCard = ({ sale_id }: {sale_id: string}) => {

  const [sale, setSale] = useState<Sale | null>(null);
  const [salesItemCount, setSalesItemCount] = useState<number>();

  useEffect(() => {
    async function fetchData() {
      await database.write(async () => {
        const __sale = await salesCollection.find(sale_id)
        const __salesItemCount = await salesItemCollection.query(Q.where('sale_id', __sale.id)).fetch()
        setSale(__sale)
        setSalesItemCount(__salesItemCount.length)
      })
    }
    fetchData()
  }, [])

  return (<View p='$3.5' backgroundColor='$background' onPress={() => router.push(`/sales/${sale_id}`)}>
    <YStack gap='$1.5'>
      <XStack w='100%' jc='space-between' ai='flex-start'>
        <YStack  >
          <Text fontSize={15} fontWeight='bold'>
            {salesItemCount} items
          </Text>
        </YStack>
        {<Text fontSize={12}>
          {sale?.createdAt ? timeAgo(sale?.createdAt) : 'No date'}
        </Text>}
      </XStack>
      <XStack>
        <View w='50%'>
          <Text>
            <Text fontWeight='900'>GHC </Text>
            {sale?.total.toFixed(2)}
          </Text>
        </View>
        <View w='50%'>
          <Text>
            <Text fontWeight='900'>QTY </Text>
            {sale?.quantity}
          </Text>
        </View>
      </XStack>
      <XStack>
        <XStack w='50%' gap='$1' ai='center'>
          <Barcode size={20} color='$blue12Light' />
          <Text>{'barcode'}</Text>
        </XStack>
        <XStack w='50%' gap='$1' ai='center'>
          <BadgeCent size={20} color='$blue12Light' />
          <Text>{sale?.payment}</Text>
        </XStack>
      </XStack>
    </YStack>
  </View>)
}



export default SalesCard;