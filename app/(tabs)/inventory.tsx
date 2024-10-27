import SalesCard, { salesData } from "components/cards/SalesCard";
import SearchBar from "components/cards/searchBar";
import { FlatList } from "react-native";
import { ScrollView, View } from "tamagui";

export default function Inventory() {
    return (<ScrollView>
        <SearchBar placeholder="Search for a product" />
        <FlatList
            style={{
                padding: 15,
                marginTop: -30,
            }}
            data={salesData}
            renderItem={({ item }) => <SalesCard
                name={item.name}
                badge={item.badge}
                paymentMethod={item.paymentMethod}
                quantity={item.quantity}
                salePrice={item.salePrice}
                timestamp={item.timestamp}
                showBadge={false} />
            }
            keyExtractor={item => `${Math.random() * 1000}`}
            scrollEnabled={false}
        />
    </ScrollView>)
}