import { Q } from '@nozbe/watermelondb';
import { withObservables } from '@nozbe/watermelondb/react';
import SalesItemCard from 'components/cards/SalesItemCard';
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import database, { salesCollection } from 'model';
import Sale from 'model/db/sales';

import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ScrollView, Text, View } from 'tamagui';
import sales from '.';

const friends = ['charlie', 'james']

const SalesDetails = ({ sales }: { sales: Sale[] }) => {
    const local = useLocalSearchParams();

    return (
        <ScrollView>
            <Text>{sales[0].id}</Text>
            <View>
                <FlatList
                    data={sales[0].saleItems}
                    renderItem={({ item }) => {
                        console.log(item);
                        return <></>;
                        // return(<SalesItemCard sales_item={item} />)
                    }}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                />

            </View>
        </ScrollView>
    );
};

const EnhanceSalesDetails = withObservables(['sales_id'], ({ sales_id }) => ({
    sales: salesCollection.query(Q.on('sales', 'id', sales_id)).observe(),
}))(SalesDetails);

export default function SalesDetailsPage() {
    const global = useGlobalSearchParams();
    return <EnhanceSalesDetails sales_id={global.sales_id} />;
}