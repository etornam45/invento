import { scannedItemsStore } from "lib/stores/scannedItems";
import database, { inventoryCollection } from "model";
import { Text, View } from "tamagui";
import BarCodeScanner from "./BarCodeScanner";
import { Q } from "@nozbe/watermelondb";

export default function ScannerModal() {

    const {  add } = scannedItemsStore();
    function handleCodeScanned(code: string) {
        database.write(async () => {
            try {
                const prod = await inventoryCollection.query(Q.on('products', 'barcode', code)).fetch()
                if (prod.length > 0) {
                    add({ inventory: prod[0], quantity: 1, price: prod[0].price })
                }
            } catch (error) {
                console.log(error)
            }
        })
    }

    return (
        <View>
            <BarCodeScanner aspectRatio={5 / 2} _onCodeScanned={handleCodeScanned} />
        </View>
    )
}