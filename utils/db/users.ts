import { observable } from "@legendapp/state";
import { syncedSupabase } from "@legendapp/state/sync-plugins/supabase";
import { generateId, supabase } from "utils/supa_legend";

export const users$ = observable(
    syncedSupabase({
        supabase,
        collection: 'users',
        select: (from) => from.select('id, name, phone, password, role, "last-sync", created_at, updated_at, deleted'),
        actions: ['read', 'create', 'update', 'delete'],
        realtime: true,
        activate: 'auto',
        // Persist data and pending changes locally
        persist: {
            name: 'users',
            retrySync: true, // Persist pending changes and retry
        },
        retry: {
            infinite: true, // Retry changes with exponential backoff
        },
    })
)

export type _users$ = typeof users$._;

export function addUser(user: {
    id?: string,
    name: string,
    phone?: string,
    password?: string,
    role?: 'owner' | 'manager' | 'shop-keeper',
    created_at?: string,
    updated_at?: string,
    deleted?: boolean,
    'last-sync'?: string,
}) {
    const id = user.id ?? generateId();
    users$[id].assign({id, 
        name: user.name,
        phone: user.phone,
        password: user.password,
    });
}

export function updateUser(id: string, user: {
    name?: string,
    phone?: string,
    password?: string,
    role?: string,
    created_at?: string,
    updated_at?: string,
    deleted?: boolean,
}) {
    users$[id].assign({
        ...user,
    });
}

export function deleteUser(id: string) {
    users$[id].delete();
}

export async function deleteUsers() {
    try {
        await users$.delete();
    } catch (error) {
        console.error(error);
    }
}

export function getUser(id: string) {
    return users$[id];
}

export function getUsers() {
    return users$.get();
}

export function getUsersArray() {
    return Object.values(users$.get());
}

export type User = {
    id: string,
    name: string,
    phone?: string,
    password?: string,
    role: 'owner' | 'manager' | 'shop-keeper',
    created_at: string,
    updated_at: string,
    deleted: boolean,
    'last-sync': string,
}