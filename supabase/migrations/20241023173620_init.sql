create table users (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    phone text unique,
    password text,
    role text default 'owner' check (role in ('owner', 'manager', 'shop-keeper')),
    -- Sync columns
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted boolean default false -- needed for soft deletes
);

create table business(
    id uuid default gen_random_uuid() primary key,
    user_id uuid references users(id),
    name text,
    city text,
    phone text,

    -- Sync columns
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted boolean default false -- needed for soft deletes
);

create table products(
    id uuid default gen_random_uuid() primary key,
    name text,
    price integer,
    barcodes text[] unique,

    -- Sync columns
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted boolean default false -- needed for soft deletes
);

create table inventory(
    id uuid default gen_random_uuid() primary key,
    product_id uuid references products(id),
    business_id uuid references business(id),
    quantity integer not null,
    price integer not null,
    sales_price integer,
    -- Sync columns
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted boolean default false -- needed for soft deletes
);

create table inventory_changes(
    id uuid default gen_random_uuid() primary key,
    inventory_id uuid references inventory(id),
    quantity integer not null,
    change_type text check (change_type in ('add', 'remove')),
    -- Sync columns
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted boolean default false -- needed for soft deletes
);

create table sales(
    id uuid default gen_random_uuid() primary key,
    business_id uuid references business(id),
    user_id uuid references users(id),
    quantity integer not null,
    total integer not null,
    discount integer,
    -- Sync columns
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted boolean default false -- needed for soft deletes
);

create table sales_items(
    id uuid default gen_random_uuid() primary key,
    sales_id uuid references sales(id),
    product_id uuid references products(id),
    quantity integer not null,
    price integer not null,
    sales_price integer,
    -- Sync columns
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted boolean default false -- needed for soft deletes
);

create table sales_payments(
    id uuid default gen_random_uuid() primary key,
    sales_id uuid references sales(id),
    amount integer not null,
    method text check (method in ('cash', 'card', 'mobile-money')),
    -- Sync columns
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted boolean default false -- needed for soft deletes
);



-- Enable realtime
alter
  publication supabase_realtime add table users;
alter publication supabase_realtime add table business;
alter publication supabase_realtime add table products;
alter publication supabase_realtime add table inventory;
alter publication supabase_realtime add table inventory_changes;
alter publication supabase_realtime add table sales;
alter publication supabase_realtime add table sales_items;
alter publication supabase_realtime add table sales_payments;



-- Legend-State helper to facilitate "Sync only diffs" (changesSince: 'last-sync') mode
CREATE OR REPLACE FUNCTION handle_times()
    RETURNS trigger AS
    $$
    BEGIN
    IF (TG_OP = 'INSERT') THEN
        NEW.created_at := now();
        NEW.updated_at := now();
    ELSEIF (TG_OP = 'UPDATE') THEN
        NEW.created_at = OLD.created_at;
        NEW.updated_at = now();
    END IF;
    RETURN NEW;
    END;
    $$ language plpgsql;

CREATE TRIGGER handle_times_users
    BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW
EXECUTE FUNCTION handle_times();

CREATE TRIGGER handle_times_products
    BEFORE INSERT OR UPDATE ON products
    FOR EACH ROW
EXECUTE FUNCTION handle_times();