import { Image, Text, View } from "tamagui";

export default function InventoryCard({
    name, quantity, price,
    image,
}: { name: string, quantity: number, price: number, image: string }) {
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
                    src={image} />
            </View>
            <View space='$1'>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '500',
                    }}
                >{name}</Text>
                <Text>GHC {price}</Text>
                <Text>{quantity} in stock</Text>
            </View>
        </View>
    );
}