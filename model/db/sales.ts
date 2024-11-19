import { Model } from '@nozbe/watermelondb'
import { children, date, field, readonly, relation, text,  } from '@nozbe/watermelondb/decorators'

export default class Sale extends Model {
    static table: string = 'sale'

    @field('total') total!: number;
    @field('payment') payment!: number;
    @field('amount') amount!: number;

    @field('business_id') businessId!: string;
    @field('user_id') userId!: string;
    @field('deleted') deleted!: boolean;

    @readonly @date('created_at') createdAt!: Date;
    @readonly @date('updated_at') updatedAt!: Date;

    @relation('business', 'business_id') business;
    @relation('users', 'user_id') user;
    @children('sale_items') saleItems;
}