import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';
import SearchBar from 'components/cards/searchBar';
import { inventoryCollection, productsCollection } from 'model';
import Products from 'model/db/products';
import InventoryCard from 'components/cards/InventoryCard';
import { withObservables } from '@nozbe/watermelondb/react';
import Inventory from 'model/db/inventory';


const InventoryPage = ({ inventory }: { inventory: Inventory[] }) => {
    return ( 
        <ScrollView>
            <SearchBar placeholder="Search for a product" />
            <FlatList
                style={{
                    padding: 10,
                    marginTop: -10,
                }}
                numColumns={2}
                data={inventory}
                renderItem={({ item }) => {
                    return (
                        <InventoryCard
                            key={item.id}
                            inventory={item}
                        />
                    )
                }}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
            />
        </ScrollView>
    );
}


const enhance = withObservables([], () => ({
    inventory: inventoryCollection.query().observe(),
}));

export default enhance(InventoryPage);