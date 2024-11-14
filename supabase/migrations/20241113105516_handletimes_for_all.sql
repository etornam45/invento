CREATE TRIGGER handle_times_inventory
    BEFORE INSERT OR UPDATE ON inventory
    FOR EACH ROW
EXECUTE FUNCTION handle_times();

CREATE TRIGGER handle_times_inventory_changes
    BEFORE INSERT OR UPDATE ON inventory_changes
    FOR EACH ROW
EXECUTE FUNCTION handle_times();

CREATE TRIGGER handle_times_sales
    BEFORE INSERT OR UPDATE ON sales
    FOR EACH ROW
EXECUTE FUNCTION handle_times();

CREATE TRIGGER handle_times_sales_items
    BEFORE INSERT OR UPDATE ON sales_items
    FOR EACH ROW
EXECUTE FUNCTION handle_times();

CREATE TRIGGER handle_times_sales_payments
    BEFORE INSERT OR UPDATE ON sales_payments
    FOR EACH ROW
EXECUTE FUNCTION handle_times();