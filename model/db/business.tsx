import { Model } from '@nozbe/watermelondb'
import { children, date, field, readonly, text,  } from '@nozbe/watermelondb/decorators'

export default class Business extends Model {
    static table = 'business'

    @text('name') name;
    @text('city') city;
    @field('phone') phone;
    @field('location') location;
    @text('user_id') userId;

    @field('deleted') deleted;

    @readonly @date('created_at') createdAt
    @readonly @date('updated_at') updatedAt
}