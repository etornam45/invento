import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';
import InventoryCard from 'components/cards/InventoryCard';
import SearchBar from 'components/cards/searchBar';

export default function Inventory() {

    useEffect(() => {
    })

    return (
        <ScrollView>
            <SearchBar placeholder="Search for a product" />
            {/* <FlatList
                style={{
                    padding: 10,
                    marginTop: -10,
                }}
                numColumns={2}
                data={Object.values(products.get()).filter((product) => !product.deleted)}
                renderItem={({ item }) => (
                    <InventoryCard
                        name={item.name || ''}
                        quantity={23}
                        price={item.price || 0}
                        image={require('../../assets/images/Crunchy-cookies.png')}
                    />
                )}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
            /> */}
        </ScrollView>
    );
}


