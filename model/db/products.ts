import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text,  } from '@nozbe/watermelondb/decorators'

export default class Products extends Model {
    static table = 'products'

    @text('name') name;
    @text('description') description;
    @field('deleted') deleted;
    @text('barcode') barcode;
    @readonly @date('created_at') createdAt
    @readonly @date('updated_at') updatedAt
}