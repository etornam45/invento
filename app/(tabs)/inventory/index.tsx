import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList } from 'react-native';
import SearchBar from 'components/cards/searchBar';
import { inventoryCollection, productsCollection } from 'model';
import InventoryCard from 'components/cards/InventoryCard';
import { withObservables } from '@nozbe/watermelondb/react';
import Inventory from 'model/db/inventory';
import { Q } from '@nozbe/watermelondb';


const InventoryPage = ({ inventory }: { inventory: Inventory[] }) => {

    const [search, setSearch] = useState<string>('');
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
        <ScrollView>
            <SearchBar placeholder="Search for a product" value={search} onSearch={setSearch} />
            <FlatList
            style={{
                padding: 10,
                marginTop: -10,
            }}
            numColumns={2}
            data={filteredInventory}
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