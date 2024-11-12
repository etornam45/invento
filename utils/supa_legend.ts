import 'react-native-get-random-values';
import { createClient } from '@supabase/supabase-js'
import { configureSyncedSupabase } from '@legendapp/state/sync-plugins/supabase'
import { v4 as uuidv4 } from 'uuid';
import { Database } from './database.types'

// Create a configured sync function
// Example generateId function
export const generateId = () => uuidv4();
configureSyncedSupabase({
    generateId,
})

export const supabase = createClient<Database>(
    process.env.EXPO_PUBLIC_SUPABASE_URL as string,
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string
)



