import { scannedItemsStore } from "lib/stores/scannedItems";
import { groupSaleByDay, timePassed } from "lib/utils";
import Inventory from "model/db/inventory";
import sales from "model/db/sales";
import { useEffect, useState } from "react";
import { Checkbox, Input, ScrollView, Text, View, XStack } from "tamagui";
import { SearchBar } from "react-native-screens";
import { Fragment } from "react/jsx-runtime";
import { Separator } from "tamagui";
import SalesCard from "./SalesCard";
import { withObservables } from "@nozbe/watermelondb/react";
import { inventoryCollection } from "model";
import { Q } from "@nozbe/watermelondb";
import Products from "model/db/products";
import { Check } from "@tamagui/lucide-icons";


const SearchList = ({ inventory }: { inventory: Inventory[] }) => {
    const [search, setSearch] = useState('')
    const [filteredInventory, setFilteredInventory] = useState<Inventory[]>([])

    async function filterInventory() {
        return await inventoryCollection.query(
            Q.on('products', Q.where('name', Q.like(`%${search}%`)))
        )
    }

    useEffect(() => {
        const fetchFilteredInventory = async () => {
            if (search.length > 0) {
                setFilteredInventory(await filterInventory())
            } else {
                setFilteredInventory(inventory)
            }
        };
        fetchFilteredInventory();
    }, [search, inventory])

    return (
        <View w='100%' h='100%'>
            <Input br={30} placeholder="Search for a product" value={search} onChangeText={setSearch} />
            <View h={10} />
            <ScrollView>
                {filteredInventory.map((item, index) => (
                    <Fragment key={index}>
                        <ListCard inventory={item} />
                        <Separator />
                    </Fragment>
                ))}
            </ScrollView>
        </View>
    )
}


const ListCard = ({ inventory }: { inventory: Inventory }) => {
    const { add, isInCart, remove } = scannedItemsStore();
    const [product, setProduct] = useState<Products>();

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await inventory.product.fetch();
            setProduct(fetchedProduct);
        };
        fetchProduct();
    }, [inventory]);

    useEffect(() => {
        console.log(product)
    }, [])

    function HandlePress() {
        if (isInCart(inventory.id)) {
            remove(inventory)
        } else {
            add({
                inventory: inventory,
                quantity: 1,
                price: inventory.price
            })
        }
    }

    return (
        <View p={15} onPress={HandlePress}>
            <XStack space>
                {/* isInCart */}
                <Checkbox checked={isInCart(inventory.id)} onPress={HandlePress} >
                    <Checkbox.Indicator>
                        <Check />
                    </Checkbox.Indicator>
                </Checkbox>
                <Text fontSize={16} color="$gray11">{product?.name} - {inventory.stock} in stock</Text>
            </XStack>
        </View>
    )
}

const enhance = withObservables([], () => ({
    inventory: inventoryCollection.query().observe(),
}));

export default enhance(SearchList);