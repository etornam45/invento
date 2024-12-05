import database, { inventoryCollection, productsCollection } from 'model'
import { Button, Image, Paragraph, ScrollView, Text, View, XStack, YStack } from 'tamagui'

export default function FinancePage() {

  return (
    <ScrollView>
      <YStack p='$4' space>
        <XStack space>
          <View>
            <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ width: 50, height: 50, borderRadius: 60 }} />
          </View>
          <YStack jc='space-between'>
            <Text fontSize={18}>Akwaba, Benjamin</Text>
            <Text>Kumasi, Ghana</Text>
          </YStack>
        </XStack>
        <View bg='#2D91FF' h={180} br={15} p={15} jc={'space-between'}>
          <XStack jc={'space-between'}>
            <YStack>
              <Text color='#fff' fontSize={18}>Income</Text>
              <Text color='#fff' fontSize={28} fontWeight={'bold'} style={{
                fontFamily: 'Inter-Black'
              }}>GHC 2000.00</Text>
            </YStack>
            <YStack ai='flex-end'>
              <Text color='#fff' fontSize={18}>Last received</Text>
              <Text color='#fff' fontSize={18}>23/45</Text>
            </YStack>
          </XStack>
          <View>
            <Button bg='#fff' br={10} p={10} mt={10}>
              <Text color='#2D91FF' fontWeight='bold' >View Summary</Text>
            </Button>
          </View>
        </View>
        <XStack space='$3'>
          <YStack space='$3' flex={1}>
            <View bg='#37474F' flex={1} br={15} p={15} jc={'space-between'}>
              <Text color='#fff' fontSize={18}>Import</Text>
            </View>
            <View bg='#37474F' flex={1} br={15} p={15} jc={'space-between'}>
              <Text color='#fff' fontSize={18}>Import</Text>
            </View>
          </YStack>
          <View bg='#37474F' flex={1} br={15} p={15} jc={'space-between'}>
            <Text color='#fff' fontSize={18}>Income</Text>
            <Text color='#fff' fontSize={28} fontWeight={'bold'} style={{
              fontFamily: 'Inter-Black'
            }}>GHC 2000.00</Text>
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
