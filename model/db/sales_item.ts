import { Model } from '@nozbe/watermelondb'
import { children, date, field, readonly, relation, text,  } from '@nozbe/watermelondb/decorators'
import Products from './products';

export default class SalesItem extends Model {
    static table = 'sales_item'

    @field('price') price!: number;
    @field('quantity') quantity!: number;
    @field('sale_id') saleId!: string;
    @field('product_id') productId!: string;
    @field('business_id') businessId!: string;

    @field('deleted') deleted!: boolean;
    @readonly @date('created_at') createdAt!: Date;
    @readonly @date('updated_at') updatedAt!: Date;

    @children('products') products!: Products;

    @relation('products', 'product_id') product;
    @relation('sale', 'sale_id') sale;
}