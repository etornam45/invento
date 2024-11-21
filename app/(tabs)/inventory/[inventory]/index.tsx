import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';
import SearchBar from 'components/cards/searchBar';
import database, { inventoryCollection, productsCollection, salesItemCollection } from 'model';
import Products from 'model/db/products';
import InventoryCard from 'components/cards/InventoryCard';
import { withObservables } from '@nozbe/watermelondb/react';
import Inventory from 'model/db/inventory';
import { useLocalSearchParams } from 'expo-router';
import { Image, Text, View, XStack, YStack } from 'tamagui';
import SalesItem from 'model/db/sales_item';
import { Q } from '@nozbe/watermelondb';
import SalesItemCard from 'components/cards/SalesItemCard';
import StripSeparator from 'components/strip_separators';
import { timeAgo } from 'lib/utils';


const InventoryDetailPage = () => {
    const local: { inventory: string } = useLocalSearchParams();

    const [inventory, setInventory] = useState<Inventory>();
    const [product, setProduct] = useState<Products>();
    const [saleItems, setSaleItems] = useState<SalesItem[]>();

    useEffect(() => {
        async function fetchData() {
            await database.write(async () => {
                const inventory = await inventoryCollection.find(Array.isArray(local.inventory) ? local.inventory[0] : local.inventory);
                const product = await productsCollection.find(inventory.productId);
                const saleItems = await salesItemCollection.query(Q.where('inventory_id', Array.isArray(local.inventory) ? local.inventory[0] : local.inventory)).fetch();
                setInventory(inventory);
                setProduct(product);
                setSaleItems(saleItems);
            })
        }

        fetchData();
    }, [])

    return (
        <ScrollView style={{
        }}>
            <View p='$4'>
                <View p='$4' borderRadius={12} bg='$background'>
                    <XStack flex={1} jc='space-between' px='$8' >
                        <Image
                            style={{
                                aspectRatio: 1,
                                flex: 1,
                            }}
                            src={require('assets/images/Crunchy-cookies.png')}
                        />
                    </XStack>
                    <XStack jc='space-between' bg='$accentBackground' p='$3' br='$4'>
                        <YStack>
                            <Text fontSize={20}>
                                {product?.name}
                            </Text>
                            <Text>
                                {/* MAX_CHARACTER=x */}
                                {product?.description.length > 20 ? product?.description.substring(0, 20) + '...' : product?.description}
                            </Text>
                        </YStack>
                        <YStack jc='space-between' ai='flex-end'>
                            <Text fontSize={16}>
                                Price GHC {inventory?.price}
                            </Text>
                            <Text>
                                {inventory?.stock} units in stock
                            </Text>
                        </YStack>
                    </XStack>
                </View>

                <View style={{
                    padding: 7,
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    marginTop: 18,
                    paddingBottom: 0,
                }}>
                    {saleItems?.map((item, index) => (
                        <Fragment key={item.id}>
                            <SalesItemCard sales_item_id={item.id} />
                            <Text mx='$4' mb='$4' color='grey' style={{
                                // italic: true,
                                fontStyle: 'italic',
                            }}>{timeAgo(item.createdAt)}</Text>
                            {index < saleItems.length - 1 && <StripSeparator />}
                        </Fragment>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}


export default (InventoryDetailPage);