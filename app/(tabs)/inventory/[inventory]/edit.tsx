import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { inventoryCollection } from 'model';
import { withObservables } from '@nozbe/watermelondb/react';
import Inventory from 'model/db/inventory';
import { useLocalSearchParams } from 'expo-router';


const InventoryEditPage = ({ inventory }: { inventory: Inventory[] }) => {
    const local: { inventory: string } = useLocalSearchParams();
    console.log('Edit', local);
    return (
        <ScrollView>
        </ScrollView>
    );
}


const enhance = withObservables([], () => ({
    inventory: inventoryCollection.query().observe(),
}));

export default enhance(InventoryEditPage);