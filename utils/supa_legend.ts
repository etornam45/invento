import 'react-native-get-random-values';
import { createClient } from '@supabase/supabase-js'
import { syncedSupabase } from '@legendapp/state/sync-plugins/supabase'
import { configureSynced } from '@legendapp/state/sync'
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid';
import { Database } from './database.types'

export const supabase = createClient<Database>(
    process.env.EXPO_PUBLIC_SUPABASE_URL as string,
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string
)


// Create a configured sync function
// Example generateId function
export const generateId = () => uuidv4();

export const customSynced = configureSynced(syncedSupabase, {
    syncMode: 'auto',
    // Use React Native Async Storage
    persist: {
        plugin: observablePersistAsyncStorage({
            AsyncStorage,
        }),
    },
    subscribe(params) {
        // Subscribe to 
    },
    generateId,
    supabase,
    changesSince: 'last-sync',
    fieldCreatedAt: 'created_at',
    fieldUpdatedAt: 'updated_at',
    // Optionally enable soft deletes
    fieldDeleted: 'deleted',
})