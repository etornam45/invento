import { observable } from "@legendapp/state";
import { syncedSupabase } from "@legendapp/state/sync-plugins/supabase";
import { generateId, supabase } from "utils/supa_legend";
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const inventory$ = observable(
    syncedSupabase({
        supabase,
        collection: 'inventory',
        select: (from) => from.select('*'),
        actions: ['read', 'create', 'update', 'delete'],
        realtime: true,
        // Persist data and pending changes locally
        persist: {
            name: 'inventory',
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

export type _inventory$ = typeof inventory$._;

export function addInventory(inventory: {
    price: number,
    product_id: string,
    quantity: number,
    sales_price: number,
    business_id: string,
}) {
    const id = generateId();
    inventory$[id].assign({
        id,
        price: inventory.price,
        product_id: inventory.product_id,
        quantity: inventory.quantity,
        sales_price: inventory.sales_price,
        business_id: inventory.business_id,
    });
    return id;
}

export function updateInventory(id: string, inventory: {
    price?: number,
    product_id?: string,
    quantity?: number,
    sales_price?: number,
    business_id?: string,
}) {
    inventory$[id].assign({
        ...inventory,
    });
}

export function deleteInventory(id: string) {
    inventory$[id].delete();
}

export function getAvailableInventory() {
    return Object.values(inventory$.get()).filter((inventory) => !inventory.deleted);
}