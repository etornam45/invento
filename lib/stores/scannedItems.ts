import Inventory from 'model/db/inventory';
import { create } from 'zustand'

interface ScannedItem {
    inventory: Inventory;
    quantity: number;
    price: number;
}

interface ScannedItemsStore {
    items: Set<ScannedItem>;
    add: (item: ScannedItem) => void;
    remove: (index: number) => void;
    clear: () => void;
    getIndexOf: (inventory: Inventory) => number;
    increaseQuantity: (inventory: Inventory, quantity: number) => void;
    decreaseQuantity: (inventory: Inventory, quantity: number) => void;
    getItem: (inventory: Inventory) => ScannedItem;
    getTotalPrice: () => number;
    getTotalQuantity: () => number;
}

export const scannedItemsStore = create<ScannedItemsStore>((set) => ({
    items: new Set<ScannedItem>(),
    add: (item) => set((state) => {
        // find for the item.inventory.id in the state.items
        const data = Array.from(state.items).find((i) => (i as ScannedItem).inventory.id === item.inventory.id);
        if (data) {
            // if found
            return { items: state.items };
        }

        state.items.add(item);
        return { items: state.items };
    }),
    remove: (index) => set((state) => {
        state.items.delete(Array.from(state.items)[index]);
        return { items: state.items };
    }),
    clear: () => set({ items: new Set() }),
    getIndexOf: (inventory) => Array.from(scannedItemsStore.getState().items).findIndex((item) => (item as ScannedItem).inventory.id === inventory.id),
    increaseQuantity: (inventory, quantity) => set((state) => {
        const index = state.getIndexOf(inventory);
        const item = Array.from(state.items)[index];
        if (item.quantity + quantity > inventory.stock) {
            return { items: state.items };
        }
        item.quantity += quantity;
        return { items: state.items };
    }),
    decreaseQuantity: (inventory, quantity) => set((state) => {
        const index = state.getIndexOf(inventory);
        const item = Array.from(state.items)[index];
        if (item.quantity - quantity < 1) {
            return { items: state.items };
        }
        item.quantity -= quantity;
        return { items: state.items };
    }),
    getItem: (inventory) => {
        const state = scannedItemsStore.getState();
        const index = state.getIndexOf(inventory);
        return Array.from(state.items)[index] as ScannedItem;
    },
    getTotalPrice: () => scannedItemsStore.getState().items.reduce((acc: number, item: ScannedItem) => acc + (item.quantity * item.price), 0),
    getTotalQuantity: () => scannedItemsStore.getState().items.reduce((acc: number, item: ScannedItem) => acc + item.quantity, 0)
}))