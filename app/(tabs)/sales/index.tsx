import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import SalesCard from "components/cards/SalesCard";
import SearchBar from "components/cards/searchBar";
import { groupSaleByDay, timePassed } from "lib/utils";
import { salesCollection } from "model";
import Sale from "model/db/sales";
import { FlatList } from "react-native";
import { Fragment } from "react/jsx-runtime";
import { ScrollView, Separator, Text, View } from "tamagui";


const SalesPage = ({ sales }: { sales: Sale[] }) => {
    return (<ScrollView>
        <SearchBar placeholder="Search for a product" />
        <View p='$3.5'>
            {Object.values(groupSaleByDay(sales)).map((sale, index) => (
                <Fragment key={index}>
                    <View p={15} bg={'white'} br={12} overflow="hidden">
                        {sale[0]?.createdAt && <View py='$2' display="flex">
                            <Text mx='$3' fontSize={16} color="$gray11">{timePassed(sale[0]?.createdAt)} - {sale.length} sales made</Text>
                        </View>}
                        <FlatList
                            data={sale}
                            renderItem={({ item }) => {
                                return (<Fragment>
                                    <Separator />
                                    <SalesCard sale_id={item.id} />
                                </Fragment>)
                            }
                            }
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                        />
                    </View>
                    <View style={{ height: 15 }} />
                </Fragment>
            ))}
        </View>

    </ScrollView>)
}

const enhance = withObservables([], () => ({
    sales: salesCollection.query(Q.sortBy('created_at', Q.desc), // Sort by created_at in descending order
).observe(),
}));

export default enhance(SalesPage);