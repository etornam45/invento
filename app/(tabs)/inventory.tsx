import { observe } from "@legendapp/state";
import InventoryCard from "components/cards/InventoryCard";
import SearchBar from "components/cards/searchBar";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ScrollView, View } from "tamagui";
import { products$ } from "utils/db/product";

export default function Inventory() {
    const router = useRouter();
    useEffect(() => {
        return observe(products$, () => {
            console.log('Products updated');
        });
    }, [router]);
    return (<ScrollView>
        <SearchBar placeholder="Search for a product" />
        <FlatList
            // Grid 
            style={{
                padding: 10,
                marginTop: -10,
            }}
            numColumns={2} 
            
            data={Object.values(products$.get()).filter((product) => !product.deleted)}
            renderItem={({ item }) => <InventoryCard
                name={item.name || ''}
                quantity={23}
                price={item.price || 0}
                image={require('../../assets/images/Crunchy-cookies.png')}
                />
            }
            keyExtractor={item => `${Math.random() * 1000}`}
            scrollEnabled={false}
        />
    </ScrollView>)
}