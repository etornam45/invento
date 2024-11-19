import database, { inventoryCollection, productsCollection } from 'model'
import { Button, Text, View } from 'tamagui'

export default function FinancePage() {
  function Test() {
    database.write(async () => {
      const _products = await productsCollection.query().fetch()
      console.log(_products)
      // create a new inventory
      const _inventory = await inventoryCollection.create((inventory) => {
        inventory.price = 100
        inventory.stock = 100
        inventory.business.set(null)
        inventory.productId = _products[0].id
      }).then(() => {
        console.log('Inventory created')
      }).catch((error) => {
        console.log(error)
      })
      console.log(_inventory)
    })
  }

  return (
    <View>
      <Button onPress={Test} >
        <Text fontSize={20} color="$blue10">
          Finance
        </Text>
      </Button>
    </View>
  )
}
