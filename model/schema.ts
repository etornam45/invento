import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'products',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'deleted', type: 'boolean' },
        { name: 'description', type: 'string' },
        { name: 'barcode', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'business',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'deleted', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'inventory',
      columns: [
        { name: 'price', type: 'number' },
        { name: 'stock', type: 'number' },
        { name: 'product_id', type: 'string' },
        { name: 'business_id', type: 'string' },
        { name: 'deleted', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'sales_item',
      columns: [
        { name: 'price', type: 'number' },
        { name: 'quantity', type: 'number' },
        { name: 'sale_id', type: 'string' },
        { name: 'product_id', type: 'string' },
        { name: 'business_id', type: 'string' },
        { name: 'inventory_id', type: 'string' },
        { name: 'deleted', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'sale',
      columns: [
        { name: 'total', type: 'number' },
        { name: 'payment', type: 'string' },
        { name: 'quantity', type: 'number' },
        { name: 'business_id', type: 'string' },
        { name: 'user_id', type: 'string' },
        { name: 'deleted', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
  ]
})