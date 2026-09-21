import { products, type Product, type StockStatus } from '@/data/products';

/**
 * The adapter is intentionally the only fixture-aware layer in the inventory
 * screen. The shapes mirror the future AMBURAX contracts without pretending
 * that this prototype has an inventory API.
 */
export type UOM = { code: 'EA'; label: 'Each' };
export type Store = { id: string; name: string; code: string; timezone: string; online: boolean };
export type Warehouse = { id: string; name: string; code: string };
export type ProductVariant = { id: string; productId: string; label: string; uom: UOM };
export type Pricing = { sellingPrice: number; mrp: number; costPrice: number | null; tax: string | null };
export type StockLevel = {
  productId: string;
  onHand: number;
  reserved: number | null;
  available: number;
  reorderLevel: number | null;
  location: string | null;
};
export type StockMovement = {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment';
  reference: string;
  quantity: number;
  occurredAt: string;
  location: string;
};
export type InventoryProduct = {
  product: Product;
  variants: ProductVariant[];
  stockLevel: StockLevel;
  pricing: Pricing;
};
export type InventorySnapshot = {
  store: Store;
  warehouse: Warehouse;
  uom: UOM;
  products: InventoryProduct[];
  movements: StockMovement[];
};

const store: Store = {
  id: 'store-01',
  name: 'Indiranagar Store',
  code: '#01',
  timezone: 'Asia/Kolkata',
  online: true,
};

const warehouse: Warehouse = { id: 'warehouse-main', name: 'Main Warehouse', code: 'WH-01' };
const uom: UOM = { code: 'EA', label: 'Each' };

const toInventoryProduct = (product: Product): InventoryProduct => ({
  product,
  variants: product.sizes.map((size, index) => ({
    id: `${product.id}-variant-${index + 1}`,
    productId: product.id,
    label: size,
    uom,
  })),
  stockLevel: {
    productId: product.id,
    onHand: product.stock,
    // Reservation, reorder and location are not present in the fixture/API.
    reserved: null,
    available: product.stock,
    reorderLevel: null,
    location: null,
  },
  pricing: {
    sellingPrice: product.price,
    mrp: product.mrp,
    costPrice: null,
    tax: null,
  },
});

export const inventoryFixtureSnapshot: InventorySnapshot = {
  store,
  warehouse,
  uom,
  products: products.map(toInventoryProduct),
  // The current fixture has no StockMovement feed. Keep this empty rather than
  // manufacturing activity records that could be mistaken for real history.
  movements: [],
};

export type InventoryDataResult =
  | { status: 'ready'; data: InventorySnapshot }
  | { status: 'empty'; data: InventorySnapshot }
  | { status: 'error'; error: string };

export function loadInventorySnapshot(): InventoryDataResult {
  if (!inventoryFixtureSnapshot.products.length) return { status: 'empty', data: inventoryFixtureSnapshot };
  return { status: 'ready', data: inventoryFixtureSnapshot };
}

export const stockStatuses: StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock'];