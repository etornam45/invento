import { observable } from "@legendapp/state";
import { syncedSupabase } from "@legendapp/state/sync-plugins/supabase";
import { generateId, supabase } from "utils/supa_legend";
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const business$ = observable(
    syncedSupabase({
        supabase,
        collection: 'business',
        select: (from) => from.select('id, name, phone, city, "last-sync", created_at, updated_at, deleted, user_id'),
        actions: ['read', 'create', 'update', 'delete'],
        realtime: true,
        activate: 'auto',
        // Persist data and pending changes locally
        persist: {
            name: 'business',
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

export type _business$ = typeof business$._;

export function addBusiness(business: {
    name: string,
    phone?: string,
    city?: string,
    user_id: string,
}) {
    console.log('business', business);
    const id = generateId();
    // console.log('id', id);
    business$[id].assign({
        id,
        name: business.name,
        phone: business.phone,
        city: business.city,
        user_id: business.user_id,
    });
    return id;
}

export function updateBusiness(id: string, business: {
    name?: string,
    phone?: string,
    city?: string,
    user_id?: string,
    created_at?: string,
    updated_at?: string,
    deleted?: boolean,
}) {
    business$[id].assign({
        ...business,
    });
}

export function deleteBusiness(id: string) {
    business$[id].delete();
}

export async function deleteBusinesses() {
    try {
        await business$.delete();
    } catch (error) {
        console.error(error);
    }
}

export function getBusiness(id: string) {
    return business$[id];
}

export function getBusinesses() {
    return business$.get();
}