import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import database, { productsCollection, salesItemCollection } from "model";
import Products from "model/db/products";
import SalesItem from "model/db/sales_item";
import { useEffect, useState } from "react";
import { Text, View, XStack } from "tamagui";

const SalesItemCard = ({ sales_item_id }: { sales_item_id: string }) => {

    const [sales_item, setSalesItem] = useState<SalesItem>();
    const [product, setProduct] = useState<Products>();

    useEffect(() => {
        database.write(async () => {
            const salesItem = await salesItemCollection.find(sales_item_id);
            const product = await productsCollection.find(salesItem.productId);
            setSalesItem(salesItem);
            setProduct(product);
        });
    }, []);

    return (
        <View py='$2' px='$3.5'>
            <XStack jc='space-between'>
                <Text fontSize={18} fontWeight='600'>{product?.name}</Text>
                {sales_item && <Text fontSize={16}>GHC {(sales_item?.quantity ?? 0) * (sales_item?.price ?? 0)}</Text>}
            </XStack>
            <XStack jc='space-between'>
                    <Text>{sales_item?.quantity} unit sold</Text>
                    <Text>Price: GHC {sales_item?.price}</Text>
            </XStack>
        </View>
    );
}

export default SalesItemCard;