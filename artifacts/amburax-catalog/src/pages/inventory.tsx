import {
  Bell,
  Boxes,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Cloud,
  Download,
  ExternalLink,
  FileUp,
  Grid2X2,
  LayoutDashboard,
  List,
  Menu,
  MoreHorizontal,
  Package,
  PanelRightClose,
  Plus,
  RotateCcw,
  Search,
  Settings2,
  ShoppingBag,
  SlidersHorizontal,
  Tag,
  Truck,
  UserRound,
  X,
} from 'lucide-react';
import { useMemo, useState, useEffect, type CSSProperties } from 'react';
import { Link } from 'wouter';
import {
  inventoryFixtureSnapshot,
  loadInventorySnapshot,
  stockStatuses,
  type InventoryProduct,
  type InventorySnapshot,
} from '@/data/inventory-adapter';

type ViewMode = 'table' | 'grid';
type InspectorTab = 'Overview' | 'Variants' | 'Stock History';
type LoadState = 'loading' | 'ready' | 'empty' | 'error';

const categories = ['Men’s Wear', 'Women’s Wear', 'Kids Wear', 'Footwear', 'Accessories', 'Ethnic Wear'];
const brands = ['Allen Solly', 'Aurelia', 'Arrow', 'H&M', 'Levi’s', 'U.S. Polo'];
const currency = (value: number) => `₹${value.toLocaleString('en-IN')}`;

function InventoryStatus({ value }: { value: InventoryProduct['product']['status'] }) {
  return <span className={`inventory-status ${value.toLowerCase().replaceAll(' ', '-')}`}>{value}</span>;
}

function InventoryImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return <span className={`${className} inventory-image-fallback`} aria-label={alt}>{alt.slice(0, 1)}</span>;
  }
  return <img className={className} src={src} alt={alt} onError={() => setBroken(true)} />;
}

function InventorySidebar() {
  const nav = [
    { label: 'Dashboard', icon: LayoutDashboard, disabled: true },
    { label: 'POS Checkout', icon: ShoppingBag, disabled: true },
    { label: 'Sales & Transactions', icon: List, disabled: true },
    { label: 'Inventory', icon: Boxes, active: true },
    { label: 'Stock Transfer', icon: Truck, disabled: true },
    { label: 'Products / Catalog', icon: Tag, href: '/products' },
    { label: 'Customers', icon: UserRound, disabled: true },
    { label: 'Suppliers', icon: Truck, disabled: true },
    { label: 'Reports', icon: LayoutDashboard, disabled: true },
  ];
  return (
    <aside className="inventory-sidebar" aria-label="AMBURAX primary navigation">
      <div className="inventory-brand">
        <div className="inventory-brand-mark"><Tag size={15} /></div>
        <div className="inventory-brand-copy">
          <div className="inventory-brand-name">AMBURAX</div>
          <div className="inventory-brand-sub">Retail operations console</div>
        </div>
      </div>
      <div className="inventory-store-card">
        <div className="inventory-store-label">Active outlet</div>
        <div className="inventory-store-copy">
          <div className="inventory-store-name">Indiranagar Store</div>
          <div className="inventory-store-meta"><span>#01 · IST</span><span className="inventory-online">Online</span></div>
        </div>
      </div>
      <nav className="inventory-nav">
        <div className="inventory-nav-section">Workspace</div>
        {nav.map(({ label, icon: Icon, active, href, disabled }) =>
          href ? (
            <Link key={label} href={href} className={`inventory-nav-item ${active ? 'active' : ''}`} data-testid={`link-nav-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}>
              <Icon size={14} /><span>{label}</span>
            </Link>
          ) : (
            <button key={label} className={`inventory-nav-item ${active ? 'active' : ''}`} disabled={disabled} type="button" title={disabled ? 'Not available in this prototype' : undefined} data-testid={`button-nav-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}>
              <Icon size={14} /><span>{label}</span>
            </button>
          ),
        )}
        <div className="inventory-nav-section">Configure</div>
        <button className="inventory-nav-item" type="button" disabled title="Not available in this prototype" data-testid="button-nav-settings"><Settings2 size={14} /><span>Store & Settings</span></button>
      </nav>
      <div className="inventory-sidebar-bottom">
        <div className="inventory-smart-card">
          <strong>Manage smarter</strong>
          <p>Track stock, variants and reorder with less noise.</p>
          <button className="inventory-button primary" disabled title="Product creation is not available in this prototype" type="button" data-testid="button-sidebar-add-product"><Plus size={13} /> Add Product</button>
        </div>
        <div className="inventory-sync"><span><Cloud size={13} /> Cloud Sync</span><span>Prototype data</span></div>
      </div>
    </aside>
  );
}

function InventoryTopbar({ onMobileMenu, onSearch, search }: { onMobileMenu: () => void; onSearch: (value: string) => void; search: string }) {
  return (
    <header className="inventory-topbar">
      <button className="inventory-mobile-menu" type="button" onClick={onMobileMenu} aria-label="Open navigation" data-testid="button-open-inventory-menu"><Menu size={16} /></button>
      <button className="inventory-store-switcher" type="button" disabled title="Store switching is not available in this prototype" data-testid="button-inventory-store-switcher">
        <ShoppingBag size={14} color="#1463d8" />
        <span><strong>Store #01</strong><span>Indiranagar</span></span>
        <ChevronDown size={13} color="#9ba9ba" />
      </button>
      <div className="inventory-global-search">
        <Search size={14} />
        <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search by SKU, product name, barcode..." aria-label="Search inventory" data-testid="input-inventory-global-search" />
        <kbd>⌘ K</kbd>
      </div>
      <div className="inventory-top-spacer" />
      <span className="inventory-status-chip inventory-top-status"><i /> Store Online</span>
      <span className="inventory-shift-chip inventory-top-status">Shift #02 · Live</span>
      <button className="inventory-button primary inventory-top-status" disabled title="Sales are not available in this prototype" type="button" data-testid="button-inventory-new-sale"><Plus size={13} /> New Sale</button>
      <button className="inventory-dots" type="button" disabled title="Notifications are not available in this prototype" aria-label="Notifications" data-testid="button-inventory-notifications"><Bell size={16} /></button>
      <div className="inventory-top-user">
        <span className="inventory-avatar">RS</span>
        <span className="inventory-top-user-copy"><strong>Ramesh Sharma</strong><small>Store Manager</small></span>
        <ChevronDown size={13} color="#9ba9ba" />
      </div>
    </header>
  );
}

function KpiRow({ data }: { data: InventorySnapshot }) {
  const totals = useMemo(() => {
    const totalUnits = data.products.reduce((sum, item) => sum + item.stockLevel.onHand, 0);
    const low = data.products.filter((item) => item.product.status === 'Low Stock').length;
    const out = data.products.filter((item) => item.product.status === 'Out of Stock').length;
    return { totalUnits, low, out };
  }, [data]);
  const items = [
    { label: 'Total Products', value: data.products.length.toLocaleString('en-IN'), note: 'Fixture assortment', icon: Package },
    { label: 'Total Stock (Units)', value: totals.totalUnits.toLocaleString('en-IN'), note: 'On-hand across assortment', icon: Boxes },
    { label: 'Stock Value', value: 'Not connected', note: 'Valuation needs pricing API', icon: ShoppingBag, muted: true },
    { label: 'Low Stock Items', value: String(totals.low), note: 'Based on fixture status', icon: CircleHelp },
    { label: 'Out of Stock', value: String(totals.out), note: 'Based on fixture status', icon: Package },
  ];
  return <section className="inventory-kpis" aria-label="Inventory summary">{items.map(({ label, value, note, icon: Icon, muted }) => <article className="inventory-kpi" key={label} data-testid={`card-inventory-kpi-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}><div className="inventory-kpi-top"><span className="inventory-kpi-label">{label}</span><span className="inventory-kpi-icon"><Icon size={14} /></span></div><div className={`inventory-kpi-value ${muted ? 'muted' : ''}`}>{value}</div><div className="inventory-kpi-note">{note}</div></article>)}</section>;
}

function FilterToolbar({ search, setSearch, category, setCategory, brand, setBrand, status, setStatus, onReset, onMore, view, setView }: {
  search: string; setSearch: (value: string) => void; category: string; setCategory: (value: string) => void; brand: string; setBrand: (value: string) => void; status: string; setStatus: (value: string) => void; onReset: () => void; onMore: () => void; view: ViewMode; setView: (value: ViewMode) => void;
}) {
  return <div className="inventory-toolbar" aria-label="Inventory filters">
    <div className="inventory-toolbar-search"><Search size={13} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by product name, SKU, barcode..." aria-label="Search products" data-testid="input-inventory-search" /></div>
    <select className="inventory-select" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category" data-testid="select-inventory-category"><option value="">All Categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select>
    <select className="inventory-select" value={brand} onChange={(event) => setBrand(event.target.value)} aria-label="Filter by brand" data-testid="select-inventory-brand"><option value="">All Brands</option>{brands.map((item) => <option key={item} value={item}>{item}</option>)}</select>
    <select className="inventory-select" value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status" data-testid="select-inventory-status"><option value="">All Status</option>{stockStatuses.map((item) => <option key={item} value={item}>{item}</option>)}</select>
    <button className="inventory-button inventory-toolbar-more" type="button" onClick={onMore} data-testid="button-inventory-more-filters"><SlidersHorizontal size={13} /> More Filters</button>
    <button className="inventory-button inventory-filter-drawer-trigger" type="button" onClick={onMore} data-testid="button-inventory-mobile-filters"><SlidersHorizontal size={13} /> Filters</button>
    <button className="inventory-reset" type="button" onClick={onReset} data-testid="button-reset-inventory-filters"><RotateCcw size={12} /> Reset</button>
    <div className="inventory-view-toggle" role="group" aria-label="Inventory view">
      <button className={view === 'table' ? 'active' : ''} type="button" onClick={() => setView('table')} aria-pressed={view === 'table'} data-testid="button-inventory-table-view"><List size={13} /> Table</button>
      <button className={view === 'grid' ? 'active' : ''} type="button" onClick={() => setView('grid')} aria-pressed={view === 'grid'} data-testid="button-inventory-grid-view"><Grid2X2 size={13} /> Grid</button>
    </div>
  </div>;
}

function ProductGrid({ items, selectedId, onSelect }: { items: InventoryProduct[]; selectedId: string | null; onSelect: (item: InventoryProduct) => void }) {
  return <div className="inventory-grid-view">{items.map((item) => <button key={item.product.id} className={`inventory-grid-card ${selectedId === item.product.id ? 'selected' : ''}`} onClick={() => onSelect(item)} type="button" data-testid={`card-inventory-product-${item.product.id}`}><InventoryImage src={item.product.image} alt={item.product.name} className="inventory-grid-image" /><strong>{item.product.name}</strong><span>{item.product.sku} · {item.product.brand}</span><div><b>{item.stockLevel.available}</b> available <InventoryStatus value={item.product.status} /></div></button>)}</div>;
}

function InventoryTable({ items, selectedId, selectedRows, onSelect, onToggleRow, onToggleAll }: { items: InventoryProduct[]; selectedId: string | null; selectedRows: string[]; onSelect: (item: InventoryProduct) => void; onToggleRow: (id: string) => void; onToggleAll: () => void }) {
  return <div className="inventory-table-scroll"><table className="inventory-table"><thead><tr><th className="check-col"><input className="inventory-checkbox" type="checkbox" checked={items.length > 0 && items.every((item) => selectedRows.includes(item.product.id))} onChange={onToggleAll} aria-label="Select all visible products" data-testid="checkbox-select-all-inventory" /></th><th className="product-col">Product</th><th className="sku-col">SKU</th><th className="category-col">Category</th><th className="brand-col">Brand</th><th className="variant-col">Variants</th><th className="number-col">Stock</th><th className="number-col">Reserved</th><th className="number-col">Available</th><th className="status-col">Status</th><th className="action-col"> </th></tr></thead><tbody>{items.map((item) => <tr key={item.product.id} className={selectedId === item.product.id ? 'selected' : ''} onClick={() => onSelect(item)} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(item); }} data-testid={`row-inventory-product-${item.product.id}`}><td className="check-col" onClick={(event) => event.stopPropagation()}><input className="inventory-checkbox" type="checkbox" checked={selectedRows.includes(item.product.id)} onChange={() => onToggleRow(item.product.id)} aria-label={`Select ${item.product.name}`} data-testid={`checkbox-inventory-product-${item.product.id}`} /></td><td className="product-col"><div className="inventory-product-cell"><InventoryImage src={item.product.image} alt={item.product.name} className="inventory-product-thumb" /><div className="inventory-product-copy"><strong className="inventory-product-name">{item.product.name}</strong><span className="inventory-product-sub inventory-ellipsis">{item.product.material}</span></div></div></td><td className="sku-col"><span className="inventory-ellipsis">{item.product.sku}</span></td><td className="category-col"><span className="inventory-ellipsis">{item.product.category.replace(' Wear', '')}</span></td><td className="brand-col"><span className="inventory-ellipsis">{item.product.brand}</span></td><td className="variant-col numeric">{item.variants.length}</td><td className="number-col numeric">{item.stockLevel.onHand}</td><td className="number-col numeric">—</td><td className="number-col numeric">{item.stockLevel.available}</td><td className="status-col"><InventoryStatus value={item.product.status} /></td><td className="action-col"><button className="inventory-dots" type="button" onClick={(event) => event.stopPropagation()} disabled title="Product actions are not available in this prototype" aria-label={`Actions for ${item.product.name}`} data-testid={`button-inventory-actions-${item.product.id}`}><MoreHorizontal size={14} /></button></td></tr>)}</tbody></table></div>;
}

function InventoryTableFoot({ page, pageCount, total, pageSize, onPage, onPageSize }: { page: number; pageCount: number; total: number; pageSize: number; onPage: (page: number) => void; onPageSize: (size: number) => void }) {
  const start = total ? (page - 1) * pageSize + 1 : 0;
  const end = Math.min(page * pageSize, total);
  return <div className="inventory-table-foot"><span data-testid="text-inventory-result-count">Showing {start}–{end} of {total} products</span><div className="inventory-pagination"><button className="inventory-page-button" type="button" disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Previous inventory page" data-testid="button-inventory-previous-page"><ChevronLeft size={13} /></button>{Array.from({ length: Math.min(4, pageCount) }, (_, index) => index + 1).map((item) => <button className={`inventory-page-button ${page === item ? 'active' : ''}`} type="button" key={item} onClick={() => onPage(item)} data-testid={`button-inventory-page-${item}`}>{item}</button>)}<button className="inventory-page-button" type="button" disabled={page >= pageCount} onClick={() => onPage(page + 1)} aria-label="Next inventory page" data-testid="button-inventory-next-page"><ChevronRight size={13} /></button></div><select className="inventory-page-size" value={pageSize} onChange={(event) => onPageSize(Number(event.target.value))} aria-label="Products per page" data-testid="select-inventory-page-size"><option value="8">8 / page</option><option value="12">12 / page</option></select></div>;
}

function DetailInspector({ item, onClose }: { item: InventoryProduct; onClose: () => void }) {
  const [tab, setTab] = useState<InspectorTab>('Overview');
  useEffect(() => setTab('Overview'), [item.product.id]);
  return <aside className="inventory-inspector" aria-label="Product details inspector">
    <div className="inventory-inspector-head"><div><div className="inventory-eyebrow">Selected product</div><strong>Product Details</strong></div><button className="inventory-dots" type="button" onClick={onClose} aria-label="Close product details" data-testid="button-close-inventory-inspector"><X size={15} /></button></div>
    <div className="inventory-inspector-body">
      <div className="inventory-inspector-summary"><InventoryImage src={item.product.image} alt={`${item.product.name} product`} className="inventory-inspector-image" /><div className="inventory-inspector-title"><div><h2>{item.product.name}</h2><div className="inventory-inspector-meta">{item.product.sku} · {item.product.brand}</div></div><InventoryStatus value={item.product.status} /></div><div className="inventory-inspector-tags"><span className="inventory-tag">{item.product.category}</span><span className="inventory-tag">{item.product.material}</span></div></div>
      <div className="inventory-detail-tabs" role="tablist" aria-label="Product detail sections">{(['Overview', 'Variants', 'Stock History'] as InspectorTab[]).map((itemTab) => <button className={`inventory-detail-tab ${tab === itemTab ? 'active' : ''}`} type="button" role="tab" aria-selected={tab === itemTab} key={itemTab} onClick={() => setTab(itemTab)} data-testid={`tab-inventory-${itemTab.toLowerCase().replaceAll(' ', '-')}`}>{itemTab}</button>)}</div>
      <div className="inventory-detail-content">
        {tab === 'Overview' && <><div className="inventory-key-grid"><div className="inventory-key"><label>Category</label><strong>{item.product.category}</strong></div><div className="inventory-key"><label>Brand</label><strong>{item.product.brand}</strong></div><div className="inventory-key"><label>HSN Code</label><strong>Not available</strong></div><div className="inventory-key"><label>Sales Price</label><strong>{currency(item.pricing.sellingPrice)}</strong></div><div className="inventory-key"><label>Cost Price</label><strong>Not connected</strong></div><div className="inventory-key"><label>Tax</label><strong>Not connected</strong></div></div><div className="inventory-stock-summary"><div className="inventory-stock-box"><label>Total Stock</label><strong>{item.stockLevel.onHand}</strong></div><div className="inventory-stock-box"><label>Reserved</label><strong>—</strong></div><div className="inventory-stock-box"><label>Available</label><strong>{item.stockLevel.available}</strong></div></div><div className="inventory-detail-lines"><div className="inventory-detail-line"><span>Reorder level</span><strong>Not available</strong></div><div className="inventory-detail-line"><span>Location</span><strong>Not available</strong></div><div className="inventory-detail-line"><span>Last updated</span><strong>{item.product.updated}</strong></div></div></>}
        {tab === 'Variants' && <><div className="inventory-eyebrow">Variant assortment · {item.variants.length}</div>{item.variants.map((variant) => <div className="inventory-detail-line" key={variant.id}><span>{variant.label} · {variant.uom.label}</span><strong>{item.stockLevel.onHand > 0 ? 'Stock total only' : 'No stock'}</strong></div>)}</>}
        {tab === 'Stock History' && <div className="inventory-empty-inline"><ExternalLink size={17} style={{ marginBottom: 7 }} /><div>Stock movement history is not connected.</div><div style={{ marginTop: 4 }}>This prototype does not invent movement records.</div></div>}
        <div className="inventory-inspector-actions"><button className="inventory-button" type="button" disabled title="Stock movement history is not available in this prototype" data-testid="button-inventory-stock-history"><ExternalLink size={12} /> View Stock History</button><button className="inventory-button primary" type="button" disabled title="Stock adjustment is not available in this prototype" data-testid="button-inventory-adjust-stock">Adjust Stock</button></div>
      </div>
    </div>
  </aside>;
}

function Analytics({ data }: { data: InventorySnapshot }) {
  const byCategory = useMemo(() => categories.map((category) => ({ category, units: data.products.filter((item) => item.product.category === category).reduce((sum, item) => sum + item.stockLevel.onHand, 0) })).filter((item) => item.units > 0).sort((a, b) => b.units - a.units), [data]);
  const statuses = useMemo(() => stockStatuses.map((status) => ({ status, count: data.products.filter((item) => item.product.status === status).length })), [data]);
  const totalUnits = data.products.reduce((sum, item) => sum + item.stockLevel.onHand, 0);
  const statusTotal = statuses.reduce((sum, item) => sum + item.count, 0);
  const inPercent = statusTotal ? statuses[0].count / statusTotal * 100 : 0;
  const lowPercent = statusTotal ? (statuses[0].count + statuses[1].count) / statusTotal * 100 : 0;
  return <section className="inventory-analytics" aria-label="Inventory analytics"><article className="inventory-analytics-card"><div className="inventory-analytics-title">Stock by Category <span>Units</span></div>{byCategory.length ? byCategory.slice(0, 5).map((item) => <div className="inventory-category-row" key={item.category}><div><span>{item.category.replace(' Wear', '')}</span><div className="inventory-progress"><i style={{ width: `${totalUnits ? item.units / totalUnits * 100 : 0}%` }} /></div></div><strong>{item.units}</strong><span style={{ color: '#98a5b4', fontSize: 8 }}>{totalUnits ? `${Math.round(item.units / totalUnits * 100)}%` : '0%'}</span></div>) : <div className="inventory-empty-inline">No category data.</div>}</article><article className="inventory-analytics-card"><div className="inventory-analytics-title">Stock by Status <span>Products</span></div>{statusTotal ? <div className="inventory-donut-wrap"><div className="inventory-donut" style={{ '--stock-percent': `${inPercent}%`, '--low-percent': `${lowPercent}%` } as CSSProperties}><div className="inventory-donut-center"><strong>{totalUnits.toLocaleString('en-IN')}</strong><span>Total Units</span></div></div><div className="inventory-legend">{statuses.map((item, index) => <div className="inventory-legend-row" key={item.status}><span><i style={{ background: index === 0 ? '#28b59b' : index === 1 ? '#f0bd53' : '#e96a7f' }} />{item.status}</span><strong>{item.count}</strong></div>)}</div></div> : <div className="inventory-empty-inline">No status data.</div>}</article><article className="inventory-analytics-card"><div className="inventory-analytics-title">Recent Stock Movements <span>View all</span></div>{data.movements.length ? data.movements.slice(0, 4).map((movement) => <div className="inventory-movement-row" key={movement.id}><i className={`inventory-movement-dot ${movement.type === 'out' ? 'out' : ''}`} /><span className="inventory-ellipsis">{movement.type} · {movement.reference}</span><strong>{movement.quantity}</strong><time>{movement.occurredAt}</time></div>) : <div className="inventory-empty-inline"><Download size={17} style={{ marginBottom: 7 }} /><div>No movement feed connected.</div><div style={{ marginTop: 4 }}>Movement records will appear with the StockMovement API.</div></div>}</article></section>;
}

function FilterDrawer({ category, setCategory, brand, setBrand, status, setStatus, onClose, onReset }: { category: string; setCategory: (value: string) => void; brand: string; setBrand: (value: string) => void; status: string; setStatus: (value: string) => void; onClose: () => void; onReset: () => void }) {
  return <><button className="inventory-overlay" type="button" onClick={onClose} aria-label="Close filters" data-testid="button-close-inventory-filter-overlay" /><aside className="inventory-filter-drawer" aria-label="Inventory filter drawer"><div className="inventory-inspector-head"><div><div className="inventory-eyebrow">Refine results</div><strong>Filters</strong></div><button className="inventory-dots" type="button" onClick={onClose} aria-label="Close filters" data-testid="button-close-inventory-filters"><X size={15} /></button></div><div className="inventory-drawer-content"><label>Category<select className="inventory-select" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All Categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><label>Brand<select className="inventory-select" value={brand} onChange={(event) => setBrand(event.target.value)}><option value="">All Brands</option>{brands.map((item) => <option key={item}>{item}</option>)}</select></label><label>Status<select className="inventory-select" value={status} onChange={(event) => setStatus(event.target.value)}><option value="">All Status</option>{stockStatuses.map((item) => <option key={item}>{item}</option>)}</select></label><button className="inventory-button" type="button" onClick={onReset} data-testid="button-reset-inventory-drawer"><RotateCcw size={13} /> Reset filters</button></div></aside></>;
}

export default function InventoryPage() {
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [data, setData] = useState<InventorySnapshot | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [status, setStatus] = useState('');
  const [view, setView] = useState<ViewMode>('table');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [selectedId, setSelectedId] = useState<string | null>(inventoryFixtureSnapshot.products[0]?.product.id ?? null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [inspectorOpen, setInspectorOpen] = useState(() => window.innerWidth >= 768);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => { const result = loadInventorySnapshot(); setLoadState(result.status); if (result.status !== 'error') setData(result.data); }, 220);
    return () => window.clearTimeout(timer);
  }, []);
  const filtered = useMemo(() => {
    if (!data) return [];
    const query = search.trim().toLowerCase();
    return data.products.filter((item) => {
      const searchable = `${item.product.name} ${item.product.sku} ${item.product.brand} ${item.product.category}`.toLowerCase();
      return (!query || searchable.includes(query)) && (!category || item.product.category === category) && (!brand || item.product.brand === brand) && (!status || item.product.status === status);
    });
  }, [data, search, category, brand, status]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const selected = data?.products.find((item) => item.product.id === selectedId) ?? visible[0] ?? null;
  const reset = () => { setSearch(''); setCategory(''); setBrand(''); setStatus(''); setPage(1); };
  const choose = (item: InventoryProduct) => { setSelectedId(item.product.id); setInspectorOpen(true); };
  const toggleRow = (id: string) => setSelectedRows((current) => current.includes(id) ? current.filter((row) => row !== id) : [...current, id]);
  const toggleAll = () => setSelectedRows((current) => visible.every((item) => current.includes(item.product.id)) ? current.filter((id) => !visible.some((item) => item.product.id === id)) : [...new Set([...current, ...visible.map((item) => item.product.id)])]);
  useEffect(() => { if (page !== safePage) setPage(safePage); }, [page, safePage]);
  return <div className="inventory-page"><div className="inventory-shell"><InventorySidebar /><div className="inventory-main"><InventoryTopbar onMobileMenu={() => setMobileMenuOpen(true)} search={search} onSearch={(value) => { setSearch(value); setPage(1); }} /><main className="inventory-content">
    <div className="inventory-page-head"><div><div className="inventory-eyebrow">Workspace / Inventory</div><h1>Inventory</h1><p>Track your stock, variants and keep your store always ready.</p></div><div className="inventory-head-actions"><button className="inventory-button" disabled title="Import is not available in this prototype" type="button" data-testid="button-inventory-import"><FileUp size={13} /> Import</button><button className="inventory-button" disabled title="Export is not available in this prototype" type="button" data-testid="button-inventory-export"><Download size={13} /> Export</button><button className="inventory-button primary" disabled title="Product creation is not available in this prototype" type="button" data-testid="button-inventory-add-product"><Plus size={13} /> Add Product</button></div></div>
    <nav className="inventory-tabs" aria-label="Inventory sections">{['Stock Overview', 'Products', 'Variants', 'Categories', 'Brands', 'Stock Adjustments', 'Stock Take', 'Low Stock', 'Expiring / Aging'].map((tab, index) => <button className={`inventory-tab ${index === 0 ? 'active' : ''}`} type="button" disabled={index !== 0} title={index !== 0 ? 'This section is not available in the prototype' : undefined} key={tab} data-testid={`button-inventory-tab-${tab.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}>{tab}</button>)}</nav>
    {loadState === 'loading' && <div className="inventory-table-panel inventory-skeleton" aria-label="Loading inventory"><div className="inventory-skeleton-row" /><div className="inventory-skeleton-row" /><div className="inventory-skeleton-row" /><div className="inventory-skeleton-row" /></div>}
    {loadState === 'error' && <div className="inventory-table-panel inventory-error"><div><strong>Inventory data could not be loaded</strong><p>Try again when the inventory contract is available.</p><button className="inventory-button primary" type="button" onClick={() => { setLoadState('loading'); window.setTimeout(() => { const result = loadInventorySnapshot(); setLoadState(result.status); if (result.status !== 'error') setData(result.data); }, 220); }} data-testid="button-retry-inventory"><RotateCcw size={13} /> Retry</button></div></div>}
    {loadState === 'empty' && <div className="inventory-table-panel inventory-error"><div><Package size={22} /><strong>No inventory records found</strong><p>Connect an inventory source to populate this workspace.</p></div></div>}
    {loadState === 'ready' && data && <><KpiRow data={data} /><FilterToolbar search={search} setSearch={(value) => { setSearch(value); setPage(1); }} category={category} setCategory={(value) => { setCategory(value); setPage(1); }} brand={brand} setBrand={(value) => { setBrand(value); setPage(1); }} status={status} setStatus={(value) => { setStatus(value); setPage(1); }} onReset={reset} onMore={() => setDrawerOpen(true)} view={view} setView={setView} /><div className="inventory-result-line"><span><strong>{filtered.length}</strong> matching products {selectedRows.length ? `· ${selectedRows.length} selected` : ''}</span>{moreFiltersOpen && <span className="inventory-filter-hint">Only category, brand and status are supported filters.</span>}<button type="button" onClick={() => setMoreFiltersOpen((open) => !open)} data-testid="button-inventory-filter-info"><Settings2 size={12} /> Filter scope</button></div><div className="inventory-workspace"><section className="inventory-table-panel" aria-label="Inventory products">{view === 'table' ? <InventoryTable items={visible} selectedId={selectedId} selectedRows={selectedRows} onSelect={choose} onToggleRow={toggleRow} onToggleAll={toggleAll} /> : <ProductGrid items={visible} selectedId={selectedId} onSelect={choose} />}{!visible.length && <div className="inventory-error"><div><Search size={22} /><strong>No products found</strong><p>Clear a filter or search term to restore the assortment.</p><button className="inventory-button" type="button" onClick={reset} data-testid="button-clear-inventory-empty"><RotateCcw size={13} /> Clear filters</button></div></div>}<InventoryTableFoot page={safePage} pageCount={pageCount} total={filtered.length} pageSize={pageSize} onPage={setPage} onPageSize={(size) => { setPageSize(size); setPage(1); }} /></section>{inspectorOpen && selected && <DetailInspector item={selected} onClose={() => setInspectorOpen(false)} />}</div><button className="inventory-inspector-toggle inventory-button" type="button" onClick={() => setInspectorOpen((open) => !open)} data-testid="button-toggle-inventory-inspector"><PanelRightClose size={13} /> {inspectorOpen ? 'Hide details' : 'Show details'}</button><Analytics data={data} /></>}
  </main></div></div>{(drawerOpen || mobileMenuOpen) && <button className="inventory-overlay" type="button" onClick={() => { setDrawerOpen(false); setMobileMenuOpen(false); }} aria-label="Close overlay" data-testid="button-close-inventory-overlay" />}{drawerOpen && <FilterDrawer category={category} setCategory={setCategory} brand={brand} setBrand={setBrand} status={status} setStatus={setStatus} onClose={() => setDrawerOpen(false)} onReset={reset} />}{mobileMenuOpen && <aside className="inventory-mobile-nav"><div className="inventory-inspector-head"><strong>AMBURAX</strong><button className="inventory-dots" type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation"><X size={15} /></button></div><InventorySidebar /></aside>}</div>;
}