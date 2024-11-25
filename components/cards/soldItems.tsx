import { Paragraph, Text, View, XStack, YStack } from "tamagui";

export default function SoldItems({data}: {data: {
    name: string,
    value: number
}[]}) {

    // caluclate the percentage
    const total = data.reduce((acc, item) => acc + item.value, 0)
    const items = data.map(item => ({
        name: item.name,
        value: Math.round((item.value / total) * 100)
    }))

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
            {items.map(item => <ProductBar key={item.name} name={item.name} persecnt={item.value} />)}
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