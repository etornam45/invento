import { withObservables } from "@nozbe/watermelondb/react";
import SalesCard from "components/cards/SalesCard";
import SearchBar from "components/cards/searchBar";
import { salesCollection } from "model";
import Sale from "model/db/sales";
import { FlatList } from "react-native";
import { ScrollView, Text, View } from "tamagui";


const SalesPage = ({ sales }: { sales: Sale[] }) => {
    return (<ScrollView>
        <SearchBar placeholder="Search for a product" />
        <FlatList
            style={{
                padding: 15,
                marginTop: -30,
            }}
            data={sales}
            renderItem={({ item }) => (<SalesCard sale={item} />)
            }
            keyExtractor={item => item.id}
            scrollEnabled={false}
        />
    </ScrollView>)
}

const enhance = withObservables([], () => ({
    sales: salesCollection.query().observe(),
}));

export default enhance(SalesPage);