---
name: Enterprise Operational Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#004f35'
  on-tertiary: '#ffffff'
  tertiary-container: '#006948'
  on-tertiary-container: '#76eab6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  title-1:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 32px
    letterSpacing: -0.02em
  title-1-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '800'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-2:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-3:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  heading-4:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-default:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-medium:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  body-compact:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-compact-semibold:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  caption-muted:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
  micro-mono:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-compact: 0.5rem
  margin: 1rem
  margin-dense: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system is engineered for high-throughput enterprise retail operations, warehouse inventory orchestration, omnichannel point-of-sale, wholesale distribution, and real-time CRM. The visual character rejects decorative bloat in favor of extreme structural clarity, high data density, rapid scan-ability, and architectural authority. 

The aesthetic is Modern Corporate combined with Tactical Utilitarianism:
- **Surface Architecture:** Crisp hairline separators, surgical contrast ratios, and modular multi-pane staging that eliminates nested modal fatigue.
- **Operational Ergonomics:** Micro-interactions prioritized for speed, tactile keybindings, tabular alignment for rapid numeric comparisons, and persistent context preservation across complex split-pane views.
- **Emotional Stance:** Authoritative, uncompromisingly stable, efficient, and precise—giving retail operators and inventory managers total confidence in high-volume, mission-critical environments.

## Colors

The system employs a tightly controlled palette engineered for instant legibility across dense data tables, register screens, and status-critical logistics monitors.

- **Canvas & Structural Surfaces:**
  - App Canvas Baseline: `#F8FAFC` (Slate 50) creates a subdued, non-glare operational field.
  - Worksurface / Card Base: `#FFFFFF` (Pure White) delivers contrast against the structural canvas.
  - Subsurface / Table Header / Striping: `#F1F5F9` (Slate 100) provides structural rhythm.
  - Borders & Hairlines: `#E2E8F0` (Slate 200) for standard structure; `#CBD5E1` (Slate 300) for interactive element strokes, active dividers, and table borders.
- **Brand & Action System:**
  - Primary Action / Selection / Focus: `#1D4ED8` (Cobalt Primary) and `#2563EB` (Cobalt Light/Hover) anchor primary workflows, active navigation items, and highlighted states.
  - Primary Text & Structural Headers: `#0F172A` (Slate 900) provides high-contrast legibility for primary labels, data metrics, and ledger totals.
  - Supporting Text: `#334155` (Slate 700) for body data; `#64748B` (Slate 500) for labels, units, and timestamps.
- **Enterprise Semantic Status Matrix:**
  - **Success / In-Stock / Verified:** `#059669` (Dark Emerald) with `#ECFDF5` (Emerald Tint) badge fill and `#A7F3D0` stroke.
  - **Warning / Low Stock / Allocation Pending:** `#D97706` (Amber Ochre) with `#FFFBEB` fill and `#FDE68A` stroke.
  - **Critical / Out of Stock / Discrepancy:** `#DC2626` (Crimson Rose) with `#FEF2F2` fill and `#FECACA` stroke.
  - **Info / In Transit / Processing:** `#0284C7` (Sky Blue) with `#F0F9FF` fill and `#BAE6FD` stroke.
  - **Neutral / Draft / Archived:** `#475569` (Slate Neutral) with `#F1F5F9` fill and `#CBD5E1` stroke.

## Typography

Inter serves as the single typographic foundation across all layers to maintain visual coherence and execution speed.

- **Numeric & Financial Display:** Every table cell, price indicator, SKU display, batch number, and inventory quantity must mandate `font-variant-numeric: tabular-nums lining-nums`. This prevents visual jitter during live inventory streaming and preserves column alignment.
- **The Micro Tier:** The 10px uppercase bold configuration (`micro-mono`) is strictly reserved for machine-readable tokens: SKU strings, batch numbers, inventory status badges, warehouse bay/rack coordinates, and tax classification IDs.
- **Vertical Density:** Line heights are clamped tightly (1.25 to 1.4 ratios) to eliminate excess vertical padding, allowing up to 24 rows of actionable data within standard laptop viewports.

## Layout & Spacing

The layout is built on a rigid 4px base increment (`4px`, `8px`, `12px`, `16px`, `24px`). Negative space is functional, ensuring high information density while preventing visual collision.

- **Enterprise App Shell:**
  - Primary Capability Rail: Fixed 240px wide sidebar; collapsible via keyboard shortcut `[Ctrl+B]` to a 64px icon-only operational strip.
  - Multi-Tenant Global Header: Fixed 56px height housing the store switcher, POS register indicator, network sync pulse, and universal command palette trigger.
- **Operational 3-Pane Workspace (Desktop):**
  - Left Structural Drawer (Facet / Category / Filter Tree): 240px width (collapsible to 0px).
  - Center Dynamic Viewport: Fluid grid containing interactive catalog tables, batch matrices, or POS grids.
  - Right Operational Inspector: Persistent 380px panel housing real-time SKU details, margin calculators, multi-warehouse stock availability, and audit logs.
- **Breakpoints & Adaptation:**
  - **Desktop (>= 1440px):** Full 3-pane concurrency enabled. Master table rows set to compact height (36px).
  - **Laptop / Tablet Landscape (1024px – 1439px):** Inspector transitions into an anchored overlay slide-over panel. Sidebar auto-collapses to the 64px rail.
  - **Tablet Portrait / Handheld POS (768px – 1023px):** Single-pane layout with persistent bottom order bar (72px). Table transitions to dense, swipeable card tiles.
  - **Mobile (< 768px):** Dedicated terminal mode. Left drawer converts to bottom bottom-sheet modal. Global header reduces to 48px height.

## Elevation & Depth

This system avoids heavy, atmospheric drop shadows, relying instead on structural borders and crisp surface layering to communicate z-index hierarchy.

- **Flat Tiers & Surface Stacking:**
  - **Tier 0 (Canvas):** `#F8FAFC`. Background for app shells and workspaces.
  - **Tier 1 (Base Container):** `#FFFFFF` with a 1px solid border (`#E2E8F0`). Used for table containers, panels, and catalog viewports.
  - **Tier 2 (Header & Active Column Highlight):** `#F1F5F9`. Anchored table headers, sticky columns, and docked summary bars.
- **Shadow System:**
  - Shadows are strictly reserved for floating elements requiring absolute situational context.
  - **Level 1 (Card Hover / Dropdown Menus):** `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)`.
  - **Level 2 (Popovers / Context Menus / Quick Search Launcher):** `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.06)`, framed with a 1px `#CBD5E1` outline.
  - **Level 3 (Modals / Flyout Drawers):** `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.1)`.

## Shapes

The design system uses a strict micro-radius discipline to preserve rectangular space efficiency and avoid the wasted padding characteristic of heavily rounded components.

- **Inputs, Buttons, and Status Chips:** 4px (`rounded-sm` / `0.25rem`). Maintains dense alignment along vertical grid edges.
- **Data Cards, Modals, and Flyout Panels:** 6px to 8px (`0.375rem` to `0.5rem`). Provides subtle separation from base window frames without softening the enterprise tone.
- **Internal Selection Dividers, Table Focus Rings, and Metric Well Insets:** 2px (`0.125rem`). Sharp, technical, and precise.

## Components

### Buttons
- **Primary:** Solid `#1D4ED8`, text `#FFFFFF`, border 1px solid `#1E40AF`. Hover: `#1E40AF`. Height: 32px (standard), 28px (compact). Padding: 0 12px. Font: 13px Semibold.
- **Secondary:** Surface `#FFFFFF`, text `#0F172A`, border 1px solid `#CBD5E1`. Hover: `#F8FAFC`, active `#F1F5F9`.
- **Destructive:** Surface `#FEF2F2`, text `#DC2626`, border 1px solid `#FECACA`. Hover: `#FEE2E2`.
- **Ghost/Icon Button:** Surface transparent, text `#475569`. Hover: `#F1F5F9`, text `#0F172A`. Size: 32x32px or 28x28px square.

### Input Fields & Controls
- **Text & Numeric Inputs:** Height 32px, background `#FFFFFF`, border 1px solid `#CBD5E1`, border-radius 4px, font 13px tabular-nums. Focus: Border `#1D4ED8`, box-shadow `0 0 0 1px #1D4ED8`. Integrated unit/currency affix labels set in `#64748B` with `#F8FAFC` background.
- **Checkboxes & Radios:** 14x14px compact footprint. Border 1.5px solid `#94A3B8`. Checked state: `#1D4ED8` with a pure white check icon. Focus ring: 2px `#93C5FD` offset 1px.

### Status Badges & Chips
- Structure: Height 20px, inline-flex, align-center, padding 0 6px, border-radius 3px, border 1px solid. Font: 10px uppercase bold (`micro-mono`).
- Variants:
  - Active / In-Stock: Background `#ECFDF5`, text `#065F46`, border `#A7F3D0`.
  - Warning / Low-Stock: Background `#FFFBEB`, text `#92400E`, border `#FDE68A`.
  - Out of Stock: Background `#FEF2F2`, text `#991B1B`, border `#FECACA`.
  - Draft / Neutral: Background `#F1F5F9`, text `#334155`, border `#CBD5E1`.

### Data Tables (High-Density Operational Grid)
- **Header Row:** Height 32px, background `#F8FAFC`, border-bottom 1px solid `#CBD5E1`. Text: 11px uppercase bold `#475569`, tracking 0.05em.
- **Body Rows:** Height 36px (condensed 32px), background `#FFFFFF`, alternate row striping `#FBFDFE`, cell border-bottom 1px solid `#F1F5F9`. Selected row: Background `#EFF6FF`, border-left 3px solid `#1D4ED8`. Hover: Background `#F8FAFC`.
- **Numeric Cells:** Text aligned right, font 13px tabular-nums.
- **SKU / Code Cells:** Monospace weight, font 12px `#334155`.

### Product & Inventory Entity Cards
- Surface `#FFFFFF`, border 1px solid `#E2E8F0`, border-radius 6px, padding 10px.
- **Header Tier:** 10px SKU micro-badge right-aligned; item title 13px bold `#0F172A` truncated to 1 line.
- **Metric Row:** Side-by-side flex block: Selling Price 14px bold `#0F172A` alongside MRP strikethrough 11px `#94A3B8`, with margin delta pill (e.g., `+34%`).
- **Inventory Bar:** 4px linear track with segmented warehouse balance; remaining quantity styled with immediate semantic color threshold (Emerald > 20, Amber 1-19, Crimson 0).

### Key Enterprise Utilities
- **Command Palette (`Cmd+K` / `Ctrl+K`):** 560px centered modal, input field 44px with zero border, list items 36px with keyboard shortcut hints right-aligned in micro-caps.
- **Persistent Detail Inspector:** Right-anchored, header 48px with tab switches (Overview, Warehouses, Suppliers, Price Lists, Audit Log), body scrollable with 12px content padding and key-value metadata list rows.