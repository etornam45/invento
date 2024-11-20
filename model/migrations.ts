import { createTable, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
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
        createTable({
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
    }
  ],
})