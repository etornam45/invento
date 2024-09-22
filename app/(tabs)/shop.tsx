import { CategoryList } from 'components/CategoryList'
import { ProductList } from 'components/ProductList'
import { YStack } from 'tamagui'
import { XStack } from 'tamagui'
import { H5, SizableText, Tabs } from 'tamagui'
export default () => (

    <Tabs defaultValue="tab1" orientation="horizontal">
        <YStack>
            <XStack width="100%" p="$1.5" backgroundColor={'$background'}>
                <Tabs.List  width="100%">
                    <Tabs.Tab value="tab1" height="$2" width="50%">
                        <SizableText width="100%">Products</SizableText>
                    </Tabs.Tab>
                    <Tabs.Tab value="tab2" height="$2" width="50%" >
                        <SizableText width="100%">Categories</SizableText>
                    </Tabs.Tab>
                </Tabs.List>
            </XStack>
            <YStack >
                <Tabs.Content value="tab1">
                    <ProductList />
                </Tabs.Content>
                <Tabs.Content value="tab2">
                    <CategoryList />
                </Tabs.Content>
            </YStack>
        </YStack>
    </Tabs>
)