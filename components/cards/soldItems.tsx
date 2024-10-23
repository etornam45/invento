import { Paragraph, Text, View, XStack, YStack } from "tamagui";

export default function SoldItems() {
    return <View
        p='$3.5'
        // mr='$3.5'
        w={340}
        // h='200'
        style={{ margin: 16, marginRight: 0,  }}
        flex={1}
        borderRadius={12}
        backgroundColor='$background'
        space
    >
        <XStack jc='space-between'>
            <Paragraph fontWeight={'bold'}>
                Most Sold Items
            </Paragraph>
            <Text>Last 7 days</Text>
        </XStack>

        <YStack space='$1.5'>
            <ProductBar name="Black soap" persecnt={80}/>
            <ProductBar name="Pepsodent Chacoal" persecnt={76}/>
            <ProductBar name="Soda Biscuit" persecnt={40}/>
            <ProductBar name="Nataraj Pencil" persecnt={10}/>
        </YStack>
    </View>
}


const ProductBar = ({ name, persecnt }: {
    name: string,
    persecnt: number
}) => {
    return <YStack>
        <XStack jc='space-between'>
            <Paragraph fontSize={13}>
                {name}
            </Paragraph>

            <Text>{persecnt}%</Text>
        </XStack>
        <XStack
            w='100%'
            h='11'
            backgroundColor='$blue4Light'
            borderRadius={6}
            overflow="hidden"
        >
            <XStack h='100%' w={`${persecnt}%`} backgroundColor='$blue10Light' >
            </XStack>
        </XStack>
    </YStack>
}