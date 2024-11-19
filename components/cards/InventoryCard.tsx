import { Button, Image, Text, View } from "tamagui";
import { withObservables } from '@nozbe/watermelondb/react'
import { Delete } from "@tamagui/lucide-icons";
import Products from "model/db/products";
import database from "model";

const InventoryCard = ({ product }: { product: Products }) => {
    return (
        <View
            style={{
                borderRadius: 10,
                padding: 10,
                backgroundColor: 'white',
                flex: 1,
                margin: 5,
                maxWidth: '48%',
                aspectRatio: .8,
            }}
            space
        >
            <View
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
            </View>
            <View space='$1'>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '500',
                    }}
                >{product?.name}</Text>
                <Text>{product?.barcode}</Text>
                <Text>{product?.description}</Text>
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

const enhance = withObservables(['products'], ({ products }) => ({
    product: products,
}))

export default enhance(InventoryCard)