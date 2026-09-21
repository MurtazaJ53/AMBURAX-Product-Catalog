import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import InventoryPage from '@/pages/inventory';
import { products, type StockStatus } from '@/data/products';
import {
  CatalogToolbar,
  FilterPanel,
  Header,
  MobileOverlay,
  PageHeader,
  ProductCatalogView,
  ProductDetailPanel,
  Sidebar,
  type CatalogFilters,
} from '@/components/catalog';
import {
  Route,
  Switch,
  Router as WouterRouter,
  useLocation,
} from 'wouter';

const queryClient = new QueryClient();

function readCatalogState(): CatalogFilters {
  const params = new URLSearchParams(window.location.search);
  const list = (key: string) => params.get(key)?.split(',').filter(Boolean) ?? [];
  const view = params.get('view') === 'list' ? 'list' : 'grid';
  const pageValue = Number(params.get('page') || 1);
  return {
    search: params.get('search') || '',
    categories: list('category'),
    brands: list('brand'),
    sizes: list('size'),
    colors: list('color'),
    stock: list('stock') as StockStatus[],
    sort: params.get('sort') || 'latest',
    page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1,
    view,
  };
}

function CatalogPage() {
  const [filters, setFilters] = useState<CatalogFilters>(readCatalogState);
  const [selectedId, setSelectedId] = useState<string | null>(() => new URLSearchParams(window.location.search).get('selected') || products[0]?.id || null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(() => window.innerWidth >= 768);

  const filteredProducts = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    const matching = products.filter((product) => {
      const searchable = `${product.name} ${product.sku} ${product.brand} ${product.category} ${product.color}`.toLowerCase();
      return (!query || searchable.includes(query))
        && (!filters.categories.length || filters.categories.includes(product.category))
        && (!filters.brands.length || filters.brands.includes(product.brand))
        && (!filters.sizes.length || filters.sizes.some((size) => product.sizes.includes(size)))
        && (!filters.colors.length || filters.colors.includes(product.color))
        && (!filters.stock.length || filters.stock.includes(product.status));
    });
    return [...matching].sort((a, b) => {
      if (filters.sort === 'price-asc') return a.price - b.price;
      if (filters.sort === 'price-desc') return b.price - a.price;
      if (filters.sort === 'stock') return b.stock - a.stock;
      return products.indexOf(a) - products.indexOf(b);
    });
  }, [filters]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / 12));
  const safePage = Math.min(filters.page, pageCount);
  const visibleProducts = filteredProducts.slice((safePage - 1) * 12, safePage * 12);
  const selectedProduct = products.find((product) => product.id === selectedId) || visibleProducts[0] || null;

  useEffect(() => {
    if (filters.page > pageCount) setFilters((current) => ({ ...current, page: pageCount }));
  }, [filters.page, pageCount]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.categories.length) params.set('category', filters.categories.join(','));
    if (filters.brands.length) params.set('brand', filters.brands.join(','));
    if (filters.sizes.length) params.set('size', filters.sizes.join(','));
    if (filters.colors.length) params.set('color', filters.colors.join(','));
    if (filters.stock.length) params.set('stock', filters.stock.join(','));
    if (filters.sort !== 'latest') params.set('sort', filters.sort);
    if (safePage > 1) params.set('page', String(safePage));
    if (selectedId) params.set('selected', selectedId);
    if (filters.view !== 'grid') params.set('view', filters.view);
    const query = params.toString();
    window.history.replaceState({}, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
  }, [filters, safePage, selectedId]);

  const clearFilters = () => setFilters((current) => ({ ...current, search: '', categories: [], brands: [], sizes: [], colors: [], stock: [], page: 1 }));
  const selectProduct = (product: typeof products[number]) => {
    setSelectedId(product.id);
    setInspectorOpen(true);
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-column">
        <Header search={filters.search} onSearch={(search) => setFilters((current) => ({ ...current, search, page: 1 }))} onOpenFilters={() => setFilterDrawerOpen(true)} />
        <PageHeader />
        <div className="workspace">
          <FilterPanel filters={filters} setFilters={setFilters} onClear={clearFilters} />
          <main className="catalog-pane" aria-label="Product catalog workspace">
            <CatalogToolbar filters={{ ...filters, page: safePage }} setFilters={setFilters} count={filteredProducts.length} onOpenFilters={() => setFilterDrawerOpen(true)} onToggleInspector={() => setInspectorOpen((open) => !open)} inspectorOpen={inspectorOpen} />
            <div className="catalog-scroll">
              <ProductCatalogView items={visibleProducts} selectedId={selectedId} view={filters.view} onSelect={selectProduct} />
            </div>
          </main>
          {inspectorOpen && selectedProduct && <ProductDetailPanel product={selectedProduct} onClose={() => setInspectorOpen(false)} />}
        </div>
      </div>
      {filterDrawerOpen && <><MobileOverlay onClose={() => setFilterDrawerOpen(false)} /><FilterPanel filters={filters} setFilters={setFilters} onClear={clearFilters} drawer onClose={() => setFilterDrawerOpen(false)} /></>}
      {inspectorOpen && selectedProduct && <div className="mobile-detail-wrapper"><MobileOverlay onClose={() => setInspectorOpen(false)} /><ProductDetailPanel product={selectedProduct} onClose={() => setInspectorOpen(false)} drawer /></div>}
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={CatalogPage} />
          <Route path="/inventory" component={InventoryPage} />
        <Route path="/products" component={CatalogPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
