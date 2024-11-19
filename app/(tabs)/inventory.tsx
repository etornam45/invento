import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';
import SearchBar from 'components/cards/searchBar';
import { productsCollection } from 'model';
import Products from 'model/db/products';
import InventoryCard from 'components/cards/InventoryCard';
import { withObservables } from '@nozbe/watermelondb/react';


const Inventory = ({products}: {products: Products[]}) => {
    console.log(products);
    return (
        <ScrollView>
            <SearchBar placeholder="Search for a product" />
            <FlatList
                style={{
                    padding: 10,
                    marginTop: -10,
                }}
                numColumns={2}
                data={products}
                renderItem={({ item }) => {
                    console.log(item);
                    return(
                    <InventoryCard
                        key={item.id}
                        products={item}
                    />
                )}}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
            />
        </ScrollView>
    );
}


const enhance = withObservables([], () => ({
    products: productsCollection.query().observe(),
}));

export default enhance(Inventory);