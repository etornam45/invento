import { Q } from '@nozbe/watermelondb';
import SalesItemCard from 'components/cards/SalesItemCard';
import StripSeparator from 'components/strip_separators';
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import database, { salesCollection, salesItemCollection } from 'model';
import Sale from 'model/db/sales';
import SalesItem from 'model/db/sales_item';

import { Fragment, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ScrollView, Text, View, XStack } from 'tamagui';

export default function SalesDetails() {

    const { sales: sale_id } = useLocalSearchParams();

    const [saleData, setSaleData] = useState<Sale>();
    const [saleItems, setSaleItems] = useState<SalesItem[]>();
    useEffect(() => {
        (async () => {
            database.write(async () => {
                const sale = await salesCollection.find(Array.isArray(sale_id) ? sale_id[0] : sale_id);
                const saleItems = await salesItemCollection.query(Q.where('sale_id', Array.isArray(sale_id) ? sale_id[0] : sale_id)).fetch();
                setSaleData(sale);
                setSaleItems(saleItems);
            })
        })();
    }, []);

    return (
        <ScrollView p='$3.5' space='$6'>
            {/* <Text>{sales[0]?.id}</Text> */}
            <View style={{
                padding: 7,
                backgroundColor: '#fff',
                borderRadius: 12,
            }}>
                {saleItems?.map((item, index) => (
                <Fragment key={item.id}>
                    <SalesItemCard sales_item_id={item.id} />
                    {index < saleItems.length - 1 && <StripSeparator />}
                </Fragment>
            ))}
            </View>

            <View
                style={{
                    padding: 7,
                    backgroundColor: '#fff',
                    borderRadius: 12,
                }}
            >
                <View py='$2' px='$3.5' space='$2'>
                    <XStack jc='space-between'>
                        <Text fontSize={16}>Quantity Sold</Text>
                        <Text fontSize={16}>{saleData?.quantity} units</Text>
                    </XStack>
                    <XStack jc='space-between'>
                        <Text fontSize={16}>Payment</Text>
                        <Text fontSize={16}>{saleData?.payment.toUpperCase()}</Text>
                    </XStack>
                    <XStack jc='space-between'>
                        <Text fontSize={16} fontWeight='600'>Total</Text>
                        <Text fontSize={16}>GHC {saleData?.total}</Text>
                    </XStack>
                </View>
            </View>
        </ScrollView>
    );
};