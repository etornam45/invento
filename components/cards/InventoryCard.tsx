import { Button, Image, Text, View } from "tamagui";
import { withObservables } from '@nozbe/watermelondb/react'
import { Delete } from "@tamagui/lucide-icons";
import Products from "model/db/products";
import database from "model";
import Inventory from "model/db/inventory";
import { router } from "expo-router";

const InventoryCard = ({ inventory, product }: { inventory: Inventory ,product: Products }) => {
    return (
        <View
            style={{
                borderRadius: 10,
                padding: 10,
                backgroundColor: 'white',
                flex: 1,
                margin: 5,
                maxWidth: '48%',
                // aspectRatio: .8,
            }}
            space

            onPress={() => router.push(`/inventory/${inventory.id}`)}
        >
            {/* <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    style={{
                        aspectRatio: 1,
                        height: 100
                    }}
                    src={require('../../assets/images/Crunchy-cookies.png')} />
            </View> */}
            <View space='$1'>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '500',
                    }}
                >{product?.name}</Text>
                <Text>GHC {inventory.price}</Text>
                <Text>{inventory?.stock} units in stock</Text>
            </View>
            {/* <Button onPress={async () => {
                console.log('delete')
                await database.write(async () => {
                    await product.destroyPermanently()
                })
            }}>
                <Delete
                    color={'red'}
                />
            </Button> */}
        </View>
    );
}

const enhance = withObservables(['inventory'], ({ inventory }) => ({
    inventory,
    product: inventory.product.observe(),
}))

export default enhance(InventoryCard)