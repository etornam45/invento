// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Constants } from "./constants";

// export const getOnboarded = async () :Promise<boolean> => {
//     try {
//         const value = await AsyncStorage.getItem(Constants.AsyncStorage.onboarded);
//         if (value === null) {
//             storeStore(false);
//         }
//         return value === 'true';
//     } catch (e) {
//         // error reading value
//         return false;
//     }
// };

// export const storeStore = async (value: string | boolean) => {
//     try {
//         await AsyncStorage.setItem(Constants.AsyncStorage.onboarded, value.toString());
//     } catch (e) {
//         // saving error
//     }
// };