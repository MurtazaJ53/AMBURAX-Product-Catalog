import {
  Bell,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Cloud,
  Grid2X2,
  LayoutList,
  Package,
  PanelRightClose,
  PanelRightOpen,
  Plus,
  Search,
  SlidersHorizontal,
  Tag,
  X,
} from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { brands, categories, colors, products, sizes, type Product, type StockStatus } from '@/data/products';

export type CatalogFilters = {
  search: string;
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  stock: StockStatus[];
  sort: string;
  page: number;
  view: 'grid' | 'list';
};

const currency = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export function StatusBadge({ status }: { status: StockStatus }) {
  const className = status === 'In Stock' ? 'in-stock' : status === 'Low Stock' ? 'low-stock' : 'out-of-stock';
  return <span className={`status-badge ${className}`} data-testid={`status-stock-${status.toLowerCase().replaceAll(' ', '-')}`}>{status}</span>;
}

function LogoMark() {
  return <div className="logo-mark" aria-hidden="true"><Tag size={18} strokeWidth={2.4} /></div>;
}

export function Sidebar() {
  const navItems = [
    { label: 'Dashboard', icon: Grid2X2 },
    { label: 'POS Checkout', icon: LayoutList },
    { label: 'Sales & Transactions', icon: LayoutList },
    { label: 'Inventory', icon: Package },
    { label: 'Stock Transfer', icon: ChevronRight },
    { label: 'Products / Catalog', icon: Tag, active: true },
    { label: 'Customers (CRM)', icon: LayoutList },
    { label: 'Customer Due (Khata)', icon: Tag },
    { label: 'Suppliers', icon: Building2 },
    { label: 'Offers & Loyalty', icon: Tag },
    { label: 'Reports & Analytics', icon: LayoutList },
    { label: 'AI Center', icon: Plus },
    { label: 'Store & Settings', icon: SlidersHorizontal },
  ];
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar-scroll" style={{ minHeight: 0, flex: 1, overflowY: 'auto' }}>
        <div className="brand-block" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid #e2e8f0' }}>
          <LogoMark />
          <div className="brand-copy">
            <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', letterSpacing: '-.02em' }}>AMBURAX</div>
            <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>Retail Operations · F4.1</div>
          </div>
        </div>
        <div className="outlet-block" style={{ margin: '12px 12px 8px', padding: 10, border: '1px solid #e2e8f0', borderRadius: 6, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
          <div className="outlet-copy">
            <div className="micro" style={{ color: '#94a3b8' }}>Active outlet</div>
            <div style={{ color: '#1e293b', fontSize: 11, fontWeight: 700, marginTop: 3 }}>Indiranagar Store <span style={{ color: '#94a3b8', fontWeight: 500 }}>#01</span></div>
          </div>
          <span className="status-badge in-stock" style={{ height: 19, padding: '0 5px', textTransform: 'none' }}>Live</span>
        </div>
        <nav style={{ padding: '6px 10px' }}>
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`nav-item ${active ? 'active' : ''}`}
              data-testid={`nav-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}
              onClick={() => undefined}
              style={{ width: '100%', border: active ? '1px solid #dbeafe' : '1px solid transparent', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 5, padding: '8px 10px', margin: '1px 0', background: active ? '#eff6ff' : 'transparent', color: active ? '#1d4ed8' : '#475569', fontSize: 12, fontWeight: active ? 700 : 500, textAlign: 'left' }}
            >
              <Icon size={15} strokeWidth={1.8} />
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="sidebar-bottom" style={{ padding: 12, borderTop: '1px solid #e2e8f0' }}>
        <div className="help-box" style={{ border: '1px solid #dbeafe', background: '#eff6ff', borderRadius: 6, padding: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <div>
              <div style={{ color: '#0f172a', fontWeight: 700, fontSize: 11 }}>Need help?</div>
              <div style={{ color: '#64748b', fontSize: 10, lineHeight: 1.45, marginTop: 4 }}>Review catalog workflows or contact support.</div>
            </div>
            <CircleHelp size={14} color="#1d4ed8" />
          </div>
          <button className="btn primary" onClick={() => undefined} style={{ height: 26, marginTop: 8, padding: '0 8px', fontSize: 10 }} data-testid="button-view-guide">View Guide</button>
        </div>
        <div className="sync-copy" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748b', fontSize: 10, padding: '10px 2px 0' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Cloud size={12} color="#1d4ed8" /> Cloud Sync</span>
          <span>2 min ago</span>
        </div>
      </div>
    </aside>
  );
}

export function Header({
  search,
  onSearch,
  onOpenFilters,
}: {
  search: string;
  onSearch: (value: string) => void;
  onOpenFilters: () => void;
}) {
  return (
    <header className="top-header">
      <button className="store-switcher btn" onClick={() => undefined} style={{ height: 34, padding: '0 10px', gap: 8 }} data-testid="button-store-switcher">
        <Building2 size={15} color="#1d4ed8" />
        <span style={{ textAlign: 'left', lineHeight: 1.15 }}><strong style={{ display: 'block', fontSize: 11 }}>Store #01</strong><small style={{ display: 'block', color: '#64748b', fontSize: 10, marginTop: 2 }}>Indiranagar</small></span>
        <ChevronDown size={13} color="#94a3b8" />
      </button>
      <div className="header-search" style={{ position: 'relative', maxWidth: 470, flex: 1 }}>
        <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: 9, pointerEvents: 'none' }} />
        <input className="field search-field" value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search products, SKU, barcode, style, brand..." aria-label="Search catalog" data-testid="input-global-search" />
        <kbd style={{ position: 'absolute', right: 8, top: 7, fontSize: 10, color: '#94a3b8', border: '1px solid #e2e8f0', borderRadius: 3, padding: '2px 5px', background: 'white' }}>⌘ K</kbd>
      </div>
      <button className="icon-btn mobile-only" onClick={onOpenFilters} aria-label="Open filters" data-testid="button-open-filters"><SlidersHorizontal size={16} /></button>
      <div className="header-status" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 9px', borderRadius: 99, background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap' }}><span style={{ width: 7, height: 7, borderRadius: 99, background: '#10b981' }} />Store Online</div>
      <div className="shift-chip" style={{ color: '#475569', background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '6px 9px', borderRadius: 4, fontSize: 10, whiteSpace: 'nowrap' }}>Shift #02 <span style={{ color: '#94a3b8' }}>Live</span></div>
      <button className="sale-button btn primary" onClick={() => undefined} style={{ height: 34 }} data-testid="button-new-sale"><Plus size={14} /> New Sale <span style={{ opacity: .75 }}>(F2)</span></button>
      <button className="icon-btn" onClick={() => undefined} style={{ position: 'relative' }} aria-label="Notifications" data-testid="button-notifications"><Bell size={17} /><span style={{ position: 'absolute', right: 0, top: 0, background: '#dc2626', color: 'white', borderRadius: 99, width: 14, height: 14, display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 700 }}>3</span></button>
      <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />
      <button className="profile-button" onClick={() => undefined} style={{ display: 'flex', alignItems: 'center', gap: 7, border: 0, background: 'transparent', padding: 0 }} data-testid="button-profile">
        <span style={{ width: 29, height: 29, display: 'grid', placeItems: 'center', borderRadius: 99, background: '#dbeafe', color: '#1d4ed8', fontWeight: 800, fontSize: 11 }}>RS</span>
        <span className="profile-copy" style={{ textAlign: 'left', lineHeight: 1.15 }}><strong style={{ display: 'block', color: '#1e293b', fontSize: 11 }}>Ramesh Sharma</strong><small style={{ display: 'block', color: '#94a3b8', fontSize: 10, marginTop: 2 }}>Store Manager</small></span>
        <ChevronDown className="profile-chevron" size={13} color="#94a3b8" />
      </button>
    </header>
  );
}

export function PageHeader() {
  return (
    <div className="page-header">
      <div>
        <div style={{ color: '#64748b', fontSize: 10, fontWeight: 600, marginBottom: 3 }}>Products <span style={{ color: '#cbd5e1', padding: '0 4px' }}>/</span> <strong style={{ color: '#334155' }}>Catalog</strong></div>
        <h1 style={{ color: '#0f172a', fontSize: 18, lineHeight: 1.2, margin: 0, letterSpacing: '-.02em' }}>Product Catalog</h1>
        <p style={{ color: '#64748b', fontSize: 10, margin: '4px 0 0' }}>Manage products, styles, variants, prices and stock across stores.</p>
      </div>
      <div className="page-actions" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <button className="btn secondary-action" onClick={() => undefined} data-testid="button-import">Import</button>
        <button className="btn secondary-action" onClick={() => undefined} data-testid="button-export">Export</button>
        <button className="btn secondary-action" onClick={() => undefined} data-testid="button-bulk-update">Bulk Update</button>
        <button className="btn primary" onClick={() => undefined} data-testid="button-add-product"><Plus size={14} /> Add Product</button>
      </div>
    </div>
  );
}

type FilterPanelProps = {
  filters: CatalogFilters;
  setFilters: Dispatch<SetStateAction<CatalogFilters>>;
  onClear: () => void;
  drawer?: boolean;
  onClose?: () => void;
};

export function FilterPanel({ filters, setFilters, onClear, drawer = false, onClose }: FilterPanelProps) {
  const [filterSearch, setFilterSearch] = useState('');
  const toggle = (key: 'categories' | 'brands' | 'sizes' | 'colors' | 'stock', value: string) => {
    setFilters((current) => {
      const values = current[key] as string[];
      return { ...current, [key]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value], page: 1 };
    });
  };
  const visibleBrands = brands.filter((brand) => brand.toLowerCase().includes(filterSearch.toLowerCase()));
  const content = (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid #e2e8f0' }}>
        <strong style={{ color: '#0f172a', fontSize: 12 }}>Filters</strong>
        <button className="btn ghost" style={{ height: 24, padding: '0 3px', color: '#1d4ed8', fontSize: 10 }} onClick={onClear} data-testid="button-clear-filters">Clear All</button>
        {drawer && <button className="icon-btn" onClick={onClose} aria-label="Close filters" data-testid="button-close-filters"><X size={16} /></button>}
      </div>
      <div style={{ position: 'relative', marginTop: 12 }}>
        <Search size={13} color="#94a3b8" style={{ position: 'absolute', left: 9, top: 9 }} />
        <input className="field" value={filterSearch} onChange={(event) => setFilterSearch(event.target.value)} style={{ width: '100%', paddingLeft: 29, background: '#f8fafc', fontSize: 11 }} placeholder="Search within results..." aria-label="Search within results" data-testid="input-filter-search" />
      </div>
      <div className="filter-section">
        <div className="filter-heading"><span>Category</span><ChevronDown size={13} color="#94a3b8" /></div>
        <div style={{ marginTop: 7 }}>
          {categories.map((category) => <label className="checkbox-row" key={category}><input type="checkbox" checked={filters.categories.includes(category)} onChange={() => toggle('categories', category)} data-testid={`checkbox-category-${category.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`} /><span>{category}</span><small style={{ color: '#94a3b8', fontSize: 10, marginLeft: 'auto' }}>{products.filter((item) => item.category === category).length || 0}</small></label>)}
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-heading"><span>Brand</span><ChevronDown size={13} color="#94a3b8" /></div>
        <div style={{ marginTop: 7 }}>
          {visibleBrands.slice(0, 5).map((brand) => <label className="checkbox-row" key={brand}><input type="checkbox" checked={filters.brands.includes(brand)} onChange={() => toggle('brands', brand)} data-testid={`checkbox-brand-${brand.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`} /><span>{brand}</span><small style={{ color: '#94a3b8', fontSize: 10, marginLeft: 'auto' }}>{products.filter((item) => item.brand === brand).length}</small></label>)}
          <button className="btn ghost" style={{ height: 24, padding: '0 0', color: '#1d4ed8', fontSize: 10 }} onClick={() => setFilterSearch(filterSearch ? '' : 'a')} data-testid="button-show-more-brands">{filterSearch ? 'Show all brands' : '+ Show More'}</button>
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-heading"><span>Price Range</span><ChevronDown size={13} color="#94a3b8" /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8 }}><input className="field tabular" defaultValue="₹ 0" aria-label="Minimum price" data-testid="input-min-price" style={{ width: 'calc(50% - 9px)', padding: '0 5px', textAlign: 'center', fontSize: 10 }} /><span style={{ color: '#94a3b8', fontSize: 10 }}>to</span><input className="field tabular" defaultValue="₹ 10,000" aria-label="Maximum price" data-testid="input-max-price" style={{ width: 'calc(50% - 9px)', padding: '0 5px', textAlign: 'center', fontSize: 10 }} /></div>
      </div>
      <div className="filter-section">
        <div className="filter-heading"><span>Size</span><ChevronDown size={13} color="#94a3b8" /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5, marginTop: 8 }}>{sizes.map((size) => <button className={`size-chip ${filters.sizes.includes(size) ? 'active' : ''}`} key={size} onClick={() => toggle('sizes', size)} data-testid={`button-size-${size}`}>{size}</button>)}</div>
      </div>
      <div className="filter-section">
        <div className="filter-heading"><span>Color</span><ChevronDown size={13} color="#94a3b8" /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginTop: 10 }}>{colors.map(({ label, value }) => <button className={`color-chip ${filters.colors.includes(label) ? 'active' : ''}`} key={label} title={label} aria-label={`Filter by ${label}`} onClick={() => toggle('colors', label)} style={{ background: value }} data-testid={`button-color-${label.toLowerCase()}`} />)}</div>
      </div>
      <div className="filter-section">
        <div className="filter-heading"><span>Stock Status</span><ChevronDown size={13} color="#94a3b8" /></div>
        <div style={{ marginTop: 7 }}>{(['In Stock', 'Low Stock', 'Out of Stock'] as StockStatus[]).map((status) => <label className="checkbox-row" key={status}><input type="checkbox" checked={filters.stock.includes(status)} onChange={() => toggle('stock', status)} data-testid={`checkbox-stock-${status.toLowerCase().replaceAll(' ', '-')}`} /><span>{status}</span><small style={{ color: '#94a3b8', fontSize: 10, marginLeft: 'auto' }}>{products.filter((item) => item.status === status).length}</small></label>)}</div>
      </div>
    </>
  );
  if (drawer) return <aside className="drawer filter-drawer" role="dialog" aria-label="Product filters" style={{ padding: 16 }}>{content}</aside>;
  return <aside className="filter-panel" aria-label="Product filters">{content}</aside>;
}

export function CatalogToolbar({ filters, setFilters, count, onOpenFilters, onToggleInspector, inspectorOpen }: { filters: CatalogFilters; setFilters: Dispatch<SetStateAction<CatalogFilters>>; count: number; onOpenFilters: () => void; onToggleInspector: () => void; inspectorOpen: boolean }) {
  const maxPages = Math.max(1, Math.ceil(count / 12));
  const setPage = (page: number) => setFilters((current) => ({ ...current, page: Math.max(1, Math.min(maxPages, page)) }));
  return (
    <div className="catalog-toolbar">
      <div className="toolbar-meta" style={{ minWidth: 100 }}><strong style={{ display: 'block', color: '#0f172a', fontSize: 12 }}>{count.toLocaleString('en-IN')} Products</strong><span style={{ fontSize: 10, color: '#64748b' }}>Showing current assortment</span></div>
      <button className="btn mobile-filter-trigger" onClick={onOpenFilters} style={{ height: 30, padding: '0 8px' }} data-testid="button-toolbar-filters"><SlidersHorizontal size={13} /> Filters</button>
      <label style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b', fontSize: 10, marginLeft: 'auto' }}>Sort by<select className="field sort-control" value={filters.sort} onChange={(event) => setFilters((current) => ({ ...current, sort: event.target.value, page: 1 }))} aria-label="Sort products" data-testid="select-sort"><option value="latest">Latest</option><option value="price-asc">Price: Low to high</option><option value="price-desc">Price: High to low</option><option value="stock">Stock level</option></select></label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <button className={`icon-btn ${filters.view === 'list' ? 'active' : ''}`} onClick={() => setFilters((current) => ({ ...current, view: 'list' }))} aria-label="List view" data-testid="button-list-view"><LayoutList size={15} /></button>
        <button className={`icon-btn ${filters.view === 'grid' ? 'active' : ''}`} onClick={() => setFilters((current) => ({ ...current, view: 'grid' }))} aria-label="Grid view" data-testid="button-grid-view"><Grid2X2 size={15} /></button>
      </div>
      <div className="pagination-mini" style={{ display: 'flex', alignItems: 'center', gap: 3, borderLeft: '1px solid #e2e8f0', paddingLeft: 8 }}>
        <button className="icon-btn" disabled={filters.page <= 1} onClick={() => setPage(filters.page - 1)} aria-label="Previous page" data-testid="button-previous-page"><ChevronLeft size={14} /></button>
        <span className="tabular" style={{ fontSize: 11, color: '#475569', minWidth: 36, textAlign: 'center' }}>{filters.page} / {maxPages}</span>
        <button className="icon-btn" disabled={filters.page >= maxPages} onClick={() => setPage(filters.page + 1)} aria-label="Next page" data-testid="button-next-page"><ChevronRight size={14} /></button>
      </div>
      <button className="icon-btn" onClick={onToggleInspector} aria-label={inspectorOpen ? 'Close inspector' : 'Open inspector'} data-testid="button-toggle-inspector">{inspectorOpen ? <PanelRightClose size={15} /> : <PanelRightOpen size={15} />}</button>
    </div>
  );
}

function ProductImage({ product, large = false }: { product: Product; large?: boolean }) {
  const [broken, setBroken] = useState(false);
  return <div className="image-frame" style={large ? { width: '100%', margin: 0 } : undefined}>{broken ? <div className="image-fallback" aria-hidden="true">{product.name.slice(0, 1)}</div> : <img className="product-image" style={large ? { aspectRatio: '1 / .94' } : undefined} src={product.image} alt={`${product.name}, ${product.color}`} onError={() => setBroken(true)} data-testid={`img-product-${product.id}`} />}</div>;
}

export function ProductCard({ product, selected, onSelect }: { product: Product; selected: boolean; onSelect: (product: Product) => void }) {
  return (
    <button className={`product-card ${selected ? 'selected' : ''}`} onClick={() => onSelect(product)} aria-pressed={selected} data-testid={`card-product-${product.id}`}>
      <ProductImage product={product} />
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 5 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: '#0f172a', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={product.name}>{product.name}</div>
          <div className="micro" style={{ color: '#64748b', marginTop: 4, letterSpacing: '.04em' }}>{product.sku}</div>
        </div>
        {product.stock < 10 && <span style={{ fontSize: 9, fontWeight: 700, color: '#d97706' }}>Low</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 8 }}><strong className="tabular" style={{ color: '#0f172a', fontSize: 14 }}>{currency(product.price)}</strong><s className="tabular" style={{ color: '#94a3b8', fontSize: 10 }}>{currency(product.mrp)}</s></div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 5, marginTop: 7 }}><span style={{ color: product.status === 'In Stock' ? '#059669' : product.status === 'Low Stock' ? '#d97706' : '#dc2626', fontSize: 10, fontWeight: 600 }}>{product.status === 'In Stock' ? '●' : product.status === 'Low Stock' ? '▲' : '■'} {product.stock} units</span><span style={{ color: '#64748b', fontSize: 10 }}>{product.color}</span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 7 }}><span style={{ width: 9, height: 9, borderRadius: 99, background: product.colorHex, border: '1px solid #cbd5e1' }} /><span style={{ color: '#94a3b8', fontSize: 10 }}>{product.sizes.join(' · ')}</span></div>
    </button>
  );
}

export function ProductTable({ items, selectedId, onSelect }: { items: Product[]; selectedId: string | null; onSelect: (product: Product) => void }) {
  return <div style={{ border: '1px solid #e2e8f0', borderRadius: 6, overflow: 'auto', background: 'white' }}><table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}><thead><tr style={{ height: 32, background: '#f8fafc', color: '#475569', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.05em', textAlign: 'left' }}><th style={{ padding: '0 10px', width: 54 }}>Item</th><th>Name / SKU</th><th>Brand</th><th>Price</th><th>Stock</th><th>Status</th><th>Size / Color</th></tr></thead><tbody>{items.map((product) => <tr key={product.id} tabIndex={0} role="button" onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(product); }} onClick={() => onSelect(product)} style={{ height: 54, background: selectedId === product.id ? '#eff6ff' : 'white', borderTop: '1px solid #f1f5f9', cursor: 'pointer' }} data-testid={`row-product-${product.id}`}><td style={{ padding: '5px 10px' }}><img src={product.image} alt="" style={{ width: 38, height: 42, objectFit: 'cover', borderRadius: 3, background: '#e2e8f0' }} /></td><td><strong style={{ display: 'block', color: '#0f172a', fontSize: 12 }}>{product.name}</strong><span className="micro" style={{ color: '#64748b', display: 'block', marginTop: 3 }}>{product.sku}</span></td><td style={{ color: '#475569', fontSize: 11 }}>{product.brand}</td><td className="tabular" style={{ color: '#0f172a', fontWeight: 700 }}>{currency(product.price)} <s style={{ color: '#94a3b8', fontSize: 10, fontWeight: 400 }}>{currency(product.mrp)}</s></td><td className="tabular" style={{ color: '#334155', fontSize: 12 }}>{product.stock}</td><td><StatusBadge status={product.status} /></td><td style={{ color: '#64748b', fontSize: 11 }}>{product.color} · {product.sizes.join(', ')}</td></tr>)}</tbody></table></div>;
}

export function ProductCatalogView({ items, selectedId, view, onSelect }: { items: Product[]; selectedId: string | null; view: 'grid' | 'list'; onSelect: (product: Product) => void }) {
  if (items.length === 0) return <div className="empty-state"><div><Package size={28} color="#94a3b8" style={{ margin: '0 auto 10px' }} /><strong style={{ display: 'block', color: '#334155', fontSize: 13 }}>No products match these filters</strong><span style={{ display: 'block', marginTop: 5, fontSize: 11 }}>Clear one or more filters to restore the catalog view.</span></div></div>;
  return view === 'grid' ? <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} selected={selectedId === product.id} onSelect={onSelect} />)}</div> : <ProductTable items={items} selectedId={selectedId} onSelect={onSelect} />;
}

type InspectorProps = { product: Product; onClose: () => void; drawer?: boolean };
export function ProductDetailPanel({ product, onClose, drawer = false }: InspectorProps) {
  const [tab, setTab] = useState('Stock');
  const tabItems = ['Stock', 'Pricing', 'Details', 'Images', 'Sales'];
  const content = (
    <>
      <div style={{ padding: 14, borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div><div className="micro" style={{ color: '#64748b' }}>Product inspector</div><strong style={{ display: 'block', marginTop: 4, color: '#0f172a', fontSize: 13 }}>Live catalog context</strong></div>
        <button className="icon-btn" onClick={onClose} aria-label="Close product inspector" data-testid="button-close-inspector"><X size={16} /></button>
      </div>
      <div className="detail-panel-body">
        <div style={{ padding: 14, borderBottom: '1px solid #f1f5f9' }}>
          <ProductImage product={product} large />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginTop: 13 }}><div style={{ minWidth: 0 }}><h2 style={{ margin: 0, color: '#0f172a', fontSize: 16, lineHeight: 1.25 }}>{product.name}</h2><div className="micro" style={{ color: '#64748b', marginTop: 5 }}>{product.sku} · {product.brand}</div></div><StatusBadge status={product.status} /></div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 10 }}><span style={{ padding: '4px 7px', color: '#475569', background: '#f1f5f9', borderRadius: 3, fontSize: 10 }}>{product.category}</span><span style={{ padding: '4px 7px', color: '#475569', background: '#f1f5f9', borderRadius: 3, fontSize: 10 }}>{product.material}</span></div>
          <p style={{ color: '#64748b', fontSize: 11, lineHeight: 1.55, margin: '11px 0 0' }}>{product.description}</p>
        </div>
        <div style={{ padding: 14, borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><strong className="tabular" style={{ color: '#0f172a', fontSize: 20 }}>{currency(product.price)}</strong><s className="tabular" style={{ color: '#94a3b8', fontSize: 11 }}>{currency(product.mrp)}</s><span style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', borderRadius: 3, padding: '2px 5px', fontSize: 10, fontWeight: 700 }}>{Math.round((1 - product.price / product.mrp) * 100)}% OFF</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15, fontSize: 11 }}><span style={{ color: '#64748b' }}>Color</span><span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#334155', fontWeight: 600 }}><i style={{ width: 12, height: 12, borderRadius: 99, background: product.colorHex, border: '1px solid #cbd5e1' }} />{product.color}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', fontSize: 11 }}><span style={{ color: '#64748b' }}>Available sizes</span><span style={{ display: 'flex', gap: 4 }}>{product.sizes.map((size) => <span key={size} style={{ border: '1px solid #e2e8f0', borderRadius: 3, padding: '3px 5px', color: '#475569', fontSize: 10 }}>{size}</span>)}</span></div>
        </div>
        <div className="tab-list" role="tablist" aria-label="Product details tabs">{tabItems.map((item) => <button className={`tab ${tab === item ? 'active' : ''}`} key={item} role="tab" aria-selected={tab === item} onClick={() => setTab(item)} data-testid={`tab-product-${item.toLowerCase()}`}>{item}</button>)}</div>
        <div style={{ padding: 14 }}>{tab === 'Stock' && <div><div style={{ display: 'flex', justifyContent: 'space-between', color: '#334155', fontSize: 11, fontWeight: 700, marginBottom: 8 }}><span>Current Stock (All Stores)</span><span className="tabular">{product.stock}</span></div>{[['Indiranagar Store', Math.ceil(product.stock * .33)], ['Koramangala Store', Math.ceil(product.stock * .25)], ['HSR Layout Store', Math.ceil(product.stock * .23)], ['Warehouse (Main)', Math.floor(product.stock * .19)]].map(([store, qty]) => <div key={String(store)} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #f1f5f9', color: '#64748b', fontSize: 11 }}><span>{store}</span><strong className="tabular" style={{ color: '#334155' }}>{qty}</strong></div>)}<button className="btn" onClick={() => undefined} style={{ width: '100%', marginTop: 7, fontSize: 11 }} data-testid="button-view-stock-details">View Stock Details</button></div>}{tab === 'Pricing' && <KeyValueRows rows={[['Selling price', currency(product.price)], ['MRP', currency(product.mrp)], ['Discount', `${Math.round((1 - product.price / product.mrp) * 100)}%`], ['Tax class', 'GST 12%']]} />}{tab === 'Details' && <KeyValueRows rows={[['Category', product.category], ['Material', product.material], ['Brand', product.brand], ['Last updated', product.updated]]} />}{tab === 'Images' && <div style={{ color: '#64748b', fontSize: 11 }}>Primary catalog image. Multi-image galleries are not supported in this prototype.</div>}{tab === 'Sales' && <KeyValueRows rows={[['Units sold · 30 days', `${Math.max(4, product.stock + 17)}`], ['Sell-through', '68%'], ['Last sale', 'Today, 09:18 AM'], ['Top store', 'Indiranagar Store']]} />}</div>
      </div>
    </>
  );
  if (drawer) return <aside className="drawer detail-drawer" role="dialog" aria-label="Product details">{content}</aside>;
  return <aside className="inspector docked" aria-label="Product details">{content}</aside>;
}

function KeyValueRows({ rows }: { rows: string[][] }) {
  return <div>{rows.map(([key, value]) => <div key={key} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '9px 0', borderBottom: '1px solid #f1f5f9', fontSize: 11 }}><span style={{ color: '#64748b' }}>{key}</span><strong className="tabular" style={{ color: '#334155', textAlign: 'right' }}>{value}</strong></div>)}</div>;
}

export function MobileOverlay({ onClose }: { onClose: () => void }) {
  return <button className="overlay" aria-label="Close panel" onClick={onClose} data-testid="button-close-overlay" />;
}

export function LoadingState() {
  return <div className="product-grid" aria-label="Loading products">{Array.from({ length: 8 }).map((_, index) => <div key={index} style={{ height: 265, borderRadius: 6, background: 'linear-gradient(90deg,#fff 25%,#f1f5f9 50%,#fff 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.2s infinite', border: '1px solid #e2e8f0' }} />)}</div>;
}