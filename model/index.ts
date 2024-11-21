import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from 'model/schema'
import migrations from 'model/migrations'
import Products from './db/products'
import { Platform } from 'react-native'
import Business from './db/business'
import Inventory from './db/inventory'
import Sale from './db/sales'
import SalesItem from './db/sales_item'
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: Platform.OS === 'ios',
  // (optional, but you should implement this method)
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
    alert('Database failed to load')
  }
})

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    // Post, // ⬅️ You'll add Models to Watermelon here
    Products,
    Business,
    Inventory,
    Sale,
    SalesItem
  ],
})

export default database

export const productsCollection = database.collections.get<Products>('products')
export const businessCollection = database.collections.get<Business>('business')
export const inventoryCollection = database.collections.get<Inventory>('inventory')
export const salesCollection = database.collections.get<Sale>('sale')
export const salesItemCollection = database.collections.get<SalesItem>('sales_item')  