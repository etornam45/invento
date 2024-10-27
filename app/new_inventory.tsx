import BarCodeScanner from "components/BarCodeScanner";
import { Text, View } from "tamagui";
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from "react";


export default function NewInventory() {

    // const bottomSheetRef = useRef<BottomSheet>(null);
    // const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (<View>
        <BarCodeScanner aspectRatio={4 / 6} />
        {/* <BottomSheet
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
        >
            <BottomSheetView style={{
                flex: 1,
                padding: 36,
                alignItems: 'center',
            }}>
                <Text>Awesome 🎉</Text>
            </BottomSheetView>
        </BottomSheet> */}
    </View>)
}