import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage"
import AsyncStorage from "@react-native-async-storage/async-storage";



export const onboardingComplete$ = observable({
    value: false,
    setValue: (value: boolean) => {
        onboardingComplete$.assign({ value });
    },
    getValue: () => {
        return onboardingComplete$.get().value;
    },
    toggle: () => {
        onboardingComplete$.assign({ value: !onboardingComplete$.value });
    },
    clear: () => {
        onboardingComplete$.assign({ value: false });
    },
});

syncObservable(onboardingComplete$, {
    persist: {
        name: 'onboardingComplete',
        plugin: observablePersistAsyncStorage({
            AsyncStorage,
        })
    }
})