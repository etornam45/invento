import { Model } from '@nozbe/watermelondb'
import { children, date, field, readonly, relation, text, } from '@nozbe/watermelondb/decorators'

export default class Inventory extends Model {
    static table = 'inventory'
    static associations = {
        products: { type: 'belongs_to' as const, key: 'product_id' },
        business: { type: 'belongs_to' as const, key: 'business_id' },
    }
    @field('price') price;
    @field('stock') stock;
    @field('product_id') productId;
    @field('business_id') businessId;

    @field('deleted') deleted;
    @readonly @date('created_at') createdAt
    @readonly @date('updated_at') updatedAt

    @children('products') products;

    @relation('products', 'product_id') product;
    @relation('business', 'business_id') business;


}