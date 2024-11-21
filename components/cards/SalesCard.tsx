import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { switchMap } from "@nozbe/watermelondb/utils/rx";
import { BadgeCent, Barcode } from "@tamagui/lucide-icons";
import sales from "app/(tabs)/sales";
import { router } from "expo-router";
import { timeAgo } from "lib/utils";
import { salesItemCollection } from "model";
import Products from "model/db/products";
import Sale from "model/db/sales";
import SalesItem from "model/db/sales_item";
import { from, map, toArray } from "rxjs";
import { Text, View, XStack, YStack } from "tamagui";

interface SalesCardProp {
  sale: Sale
  salesItemCount: SalesItem[]
}

const SalesCard = ({ sale, salesItemCount }: SalesCardProp) => {
  return (<View mt='$3.5' p='$3.5' backgroundColor='$background' borderRadius={12} onPress={() => router.push(`/sales/${sale.id}`)}>
    <YStack gap='$1.5'>
      <XStack w='100%' jc='space-between' ai='flex-start'>
        <YStack  >
          <Text fontSize={15} fontWeight='bold'>
            {salesItemCount.length} items
          </Text>
        </YStack>
        {<Text fontSize={12}>
          {timeAgo(sale.createdAt)}
        </Text>}
      </XStack>
      <XStack>
        <View w='50%'>
          <Text>
            <Text fontWeight='900'>GHC </Text>
            {sale.total.toFixed(2)}
          </Text>
        </View>
        <View w='50%'>
          <Text>
            <Text fontWeight='900'>QTY </Text>
            {sale.quantity}
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
          <Text>{sale.payment}</Text>
        </XStack>
      </XStack>
    </YStack>
  </View>)
}

const enhance = withObservables(['sale'], ({ sale }: { sale: Sale }) => ({
  sale,
  salesItemCount: salesItemCollection.query(Q.where('sale_id', sale.id)).observe()
}))

export default enhance(SalesCard);