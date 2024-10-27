-- Change all columns from last_sync to last-sync

ALTER TABLE public.users
  RENAME COLUMN last_sync TO "last-sync";

ALTER TABLE public.business
    RENAME COLUMN last_sync TO "last-sync";

ALTER TABLE public.products
    RENAME COLUMN last_sync TO "last-sync";

ALTER TABLE public.inventory
    RENAME COLUMN last_sync TO "last-sync";

ALTER TABLE public.inventory_changes    
    RENAME COLUMN last_sync TO "last-sync";

ALTER TABLE public.sales
    RENAME COLUMN last_sync TO "last-sync";

ALTER TABLE public.sales_items  
    RENAME COLUMN last_sync TO "last-sync";

ALTER TABLE public.sales_payments    
    RENAME COLUMN last_sync TO "last-sync";