import SalesCard, { salesData } from "components/cards/SalesCard";
import SearchBar from "components/cards/searchBar";
import { FlatList } from "react-native";
import { Text, View } from "tamagui";


export default function SalesPage() {
    return <>
        <View>
            <SearchBar />
            <FlatList
                style={{
                    padding: 15
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
            />
        </View>
    </>
}