// import { observe } from "@legendapp/state";
// import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import InventoryCard from "components/cards/InventoryCard";
import SearchBar from "components/cards/searchBar";
import { FlatList } from "react-native";
import { ScrollView, View } from "tamagui";
import { products$ as _products$ } from "utils/db/product";
import { observer } from '@legendapp/state/react'


export default function Inventory() {
    return (<ScrollView>
        <SearchBar placeholder="Search for a product" />
        <ProductList products$={_products$} />
    </ScrollView>)
}


const ProductList = observer(({products$}: {products$: typeof _products$}) => {
    const products = products$.get();

    if (!products) return <></>

    return <FlatList
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
        />}
        keyExtractor={item => item.id}
        scrollEnabled={false}
    />
})

