import { BadgeCent, Barcode } from "@tamagui/lucide-icons";
import { Text, View, XStack, YStack } from "tamagui";

interface SalesCardProp {
  name: string;
  salePrice: number;
  quantity: number;
  paymentMethod: 'Cash' | 'Momo',
  badge: 'Sale' | 'Stock'
  timestamp: string
  showBadge?: boolean
  barcode?: string
}

export default function SalesCard({ badge, barcode ,name, paymentMethod, quantity, salePrice, timestamp, showBadge = true }: SalesCardProp) {
  return (<View mt='$3.5' p='$3.5' backgroundColor='$background' borderRadius={12}>
    <YStack gap='$1.5'>
      <XStack w='100%' jc='space-between' ai='flex-start'>
        <YStack  >
          <Text fontSize={15} fontWeight='bold'>
            {name}
          </Text>
          {showBadge && <Text fontSize={10}>
            {new Date(new Date().valueOf() - new Date(timestamp).valueOf()).getMinutes()} min
          </Text>}
        </YStack>
        {showBadge &&
          <View borderRadius={20} backgroundColor={badge == 'Sale' ? '$green10' : '$blue10'} px='$2'>
            <Text color='$white1'>{badge}</Text>
          </View>
        }
        {!showBadge && <Text fontSize={13}>
          {new Date(new Date().valueOf() - new Date(timestamp).valueOf()).getMinutes()} min
        </Text>}
      </XStack>
      <XStack>
        <View w='50%'>
          <Text>
            <Text fontWeight='900'>GHC </Text>
            {salePrice.toFixed(2)}
          </Text>
        </View>
        <View w='50%'>
          <Text>
            <Text fontWeight='900'>QTY </Text>
            {quantity}
          </Text>
        </View>
      </XStack>
      <XStack>
        <XStack w='50%' gap='$1' ai='center'>
          <Barcode size={20} color='$blue12Light' />
          <Text>{barcode}</Text>
        </XStack>
        <XStack w='50%' gap='$1' ai='center'>
          <BadgeCent size={20} color='$blue12Light' />
          <Text>{paymentMethod}</Text>
        </XStack>
      </XStack>
    </YStack>
  </View>)
}

export const salesData: SalesCardProp[] = [
  {
    "badge": "Stock",
    "name": "Pepsodent Chacoal",
    "paymentMethod": "Cash",
    "quantity": 2,
    "salePrice": 13,
    "timestamp": "2024-10-15T00:00:00Z",
  },
  {
    "badge": "Sale",
    "name": "Pepsodent Chacoal",
    "paymentMethod": "Cash",
    "quantity": 2,
    "salePrice": 13,
    "timestamp": "2024-10-15T00:00:00Z",
  },
  {
    "badge": "Sale",
    "name": "Pepsodent Chacoal",
    "paymentMethod": "Cash",
    "quantity": 2,
    "salePrice": 13,
    "timestamp": "2024-10-15T00:00:00Z",
  },
  {
    "badge": "Sale",
    "name": "Pepsodent Chacoal",
    "paymentMethod": "Cash",
    "quantity": 2,
    "salePrice": 13,
    "timestamp": "2024-10-15T00:00:00Z",
  },
  {
    "badge": "Sale",
    "name": "Pepsodent Chacoal",
    "paymentMethod": "Cash",
    "quantity": 2,
    "salePrice": 13,
    "timestamp": "2024-10-15T00:00:00Z",
  },
  {
    "badge": "Sale",
    "name": "Pepsodent Chacoal",
    "paymentMethod": "Cash",
    "quantity": 2,
    "salePrice": 13,
    "timestamp": "2024-10-15T00:00:00Z",
  },
  {
    "badge": "Stock",
    "name": "Pepsodent Chacoal",
    "paymentMethod": "Momo",
    "quantity": 2,
    "salePrice": 13,
    "timestamp": "2024-10-15T00:00:00Z",
  },
  {
    "badge": "Sale",
    "name": "Pepsodent Chacoal",
    "paymentMethod": "Cash",
    "quantity": 2,
    "salePrice": 13,
    "timestamp": "2024-10-15T00:00:00Z",
  },
  {
    "badge": "Sale",
    "name": "Pepsodent Chacoal",
    "paymentMethod": "Cash",
    "quantity": 2,
    "salePrice": 13,
    "timestamp": "2024-10-15T00:00:00Z",
  },
  {
    "badge": "Stock",
    "name": "Pepsodent Chacoal",
    "paymentMethod": "Cash",
    "quantity": 2,
    "salePrice": 13,
    "timestamp": "2024-10-15T00:00:00Z",
  }
]