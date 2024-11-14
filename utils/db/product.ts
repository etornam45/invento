import { observable, observe } from "@legendapp/state";
import { generateId, supabase } from "utils/supa_legend";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv"
import { syncedSupabase } from "@legendapp/state/sync-plugins/supabase";
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const products$ = observable(
    syncedSupabase({
        supabase,
        collection: 'products',
        select: (from) => from.select('*'),
        actions: ['read', 'create', 'update', 'delete'],
        realtime: true,
        activate: 'auto',
        subscribe(params) {

        },
        // Persist data and pending changes locally
        persist: {
            name: 'products',
            retrySync: true, // Persist pending changes and retry
            plugin: observablePersistAsyncStorage({
                AsyncStorage,
            }),
        },
        retry: {
            infinite: true, // Retry changes with exponential backoff
        },
    })
)

export type _products$ = typeof products$._;

export function addProduct(product: {
    name: string,
    price: number,
    barcodes: string[],
}) {
    const id = generateId();
    products$[id].assign({
        id,
        name: product.name,
        price: product.price,
        barcodes: product.barcodes,
    });
    return id;
}

export function updateProduct(id: string, product: {
    name?: string,
    price?: number,
    barcodes?: string[],
}) {
    products$[id].assign({
        ...product,
    });
}

export function deleteProduct(id: string) {
    products$[id].delete();
}

export function getAvailableProducts() {
    return Object.values(products$.get()).filter((product) => !product.deleted);
}

export const products_ = observable(() => products$.get());