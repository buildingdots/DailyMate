---
name: DailyMate
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
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system embodies a calm, trustworthy, and human-centric approach to personal finance. Eschewing the cold, intimidating rigidity of legacy banking and the hyperactive gamification of neo-brokerages, it prioritizes psychological ease and financial clarity. The experience is designed to reduce the anxiety surrounding daily spending, budgeting, and long-term saving through soft, tactile cards, generous structural breathing room, and clear, welcoming typography.

The aesthetic blends **Modern Fintech Minimalism** with **Warm Tactility**. Surfaces are crisp and functional, reinforced by pill-shaped interactive anchors, smooth pill containers, and soft ambient drop shadows that mimic natural, diffused daylight. Micro-interactions should feel gentle, purposeful, and reassuring rather than startling or urgency-driven.

## Colors

The palette establishes authority and stability with deep slate tones while infusing optimism through soft aquatic greens and corals:

- **Primary Canvas & Surfaces**: Base background sits on Light Cool Gray (`#F8FAFC`), while primary elevated interaction cards sit on Pure White (`#FFFFFF`). Higher-tier overlays leverage frosted whites.
- **Brand & Structural Neutrals**: Dark Charcoal (`#0F172A`) anchors all primary text, active states, and dominant key actions. Muted Slate (`#64748B`) handles supporting metadata, borders, and empty states. Subdued line separators use `#E2E8F0`.
- **Financial Semantics**:
  - **Income / Cash Inflow**: Muted Emerald (`#10B981` / `#059669`). Used strictly for positive balance deltas and completed deposits.
  - **Expense / Debits**: Soft Coral (`#F43F5E` / `#E11D48`). Delivers visibility without triggering panic or visual alarm.
  - **Goals & Wealth Growth**: Deep Teal (`#0D9488`). Communicates compounding progress and discipline.
  - **Liabilities & Debt**: Muted Terracotta (`#EA580C`). Clear differentiation from daily operational expenses.
  - **Attention & Warnings**: Amber (`#F59E0B`). Used for upcoming bill due dates, budget thresholds (80%+ consumed), and sync notices.

## Typography

Typography balances warmth and precision. Headings and numeric summaries utilize **Plus Jakarta Sans**, imparting an approachable, contemporary character with geometric clarity and rounded aperture terminals. Long-form copy, transaction records, meta-information, and interactive field inputs deploy **Inter** for unmatched legibility at micro scales.

Numeric representation rules:
- Currency signs (`$`, `€`, `£`) inherit a reduced opacity (75%) and lighter font-weight than the trailing value figures to keep focus on amount magnitude.
- Tabular lining figures (`tnum`) must be toggled on across all transaction lists, tables, and live account tallies to eliminate horizontal jitter during balance updates.

## Layout & Spacing

The system utilizes an adaptive fluid grid optimized first for mobile portrait screens, scaling systematically up to tablet and responsive web dashboards:

- **Mobile (<640px)**: 4-column layout with `1.25rem` (20px) outer margins and `1rem` (16px) gutters. The bottom navigation region reserves `4.5rem` (72px) plus device safe-area insets to prevent interaction collision with thumb zones.
- **Tablet (640px–1024px)**: 8-column layout with `1.5rem` (24px) gutters and `2rem` (32px) outer margins, grouping metrics into dual-card clusters.
- **Desktop (>1024px)**: 12-column max-width container (`1200px`) centered horizontally with `1.5rem` gutters.

Component internal padding strictly respects the `space-*` scale: primary cards rely on `space-lg` (24px) to retain an airy, uncluttered structure. Grouped rows within modular sections use `space-sm` (8px) gaps.

## Elevation & Depth

Visual depth avoids harsh directional shadows in favor of ambient multi-layer lighting that replicates daylight diffusion across smooth matte finishes:

- **Level 0 (Flat Canvas)**: Light Cool Gray (`#F8FAFC`) base ground. Unbordered and flat.
- **Level 1 (Card & Module Resting)**: Pure White (`#FFFFFF`) with a delicate hairline boundary (`1px solid #F1F5F9`) and a soft dual shadow: `0 1px 2px -1px rgba(15, 23, 42, 0.04), 0 4px 12px -2px rgba(15, 23, 42, 0.03)`.
- **Level 2 (Interactive Floating / Active Cards)**: Hovered items, active swipe panels, or balance overview widgets: `0 8px 24px -4px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.02)`.
- **Level 3 (Modals, Action Sheets, Quick-Add Drawers)**: Deep z-index surfaces utilize `0 20px 32px -8px rgba(15, 23, 42, 0.12)` over a 24% opacity `#0F172A` backdrop blur (`8px`).

## Shapes

The design system adopts a soft, friendly pill-oriented shape language (`roundedness: 3`). Standard content surfaces use substantial corner radii (`1.5rem` / 24px, or `rounded-2xl`), while featured primary balance summaries, modals, and focal hero cards transition to `2rem` (32px, or `rounded-3xl`).

Interactive inputs, pills, filter badges, and primary action buttons adopt full pill geometry (`9999px`), reinforcing an approachable, thumb-friendly ergonomic profile throughout handheld workflows.

## Components

### Buttons
- **Primary**: Full pill geometry, background `#0F172A`, foreground `#FFFFFF`. Pressed state scales subtly to `0.98` with background adjusting to `#1E293B`.
- **Secondary / Actionable**: `#0D9488` background with `#FFFFFF` text, applied to forward momentum actions such as "Add Transaction" or "Transfer to Goal".
- **Ghost / Tertiary**: Neutral transparent fill, `#0F172A` text, hovering to `#F1F5F9`.

### Chips & Filter Pills
- Fully rounded pills (`9999px`) with padding `8px 16px`.
- Inactive state: `#F1F5F9` background, `#64748B` typography.
- Active state: `#0F172A` background, `#FFFFFF` typography. Category tags feature contextual micro-dots in financial semantic colors.

### Cards & Grouped Containers
- Constructed on `#FFFFFF` surfaces with `rounded-2xl` (24px) corners and `space-lg` (24px) inner padding.
- Encased in a `1px` subtle border of `#E2E8F0` or `#F1F5F9`.
- Dynamic budget tracking cards integrate thin (6px), pill-capped horizontal progress tracks with smooth linear transitions.

### Lists & Transaction Feeds
- Spaced item rows separated by hairline dividers (`#F1F5F9`) or contained within standalone micro-cards (`rounded-xl` / 16px).
- Left-anchored icon containers: 44px pill-circle containers with 12% tint matching the transaction category (e.g., `#10B981` at 12% opacity with emerald icon for salary).
- Right-anchored amounts: Monospaced/tabular lining numeric styling with explicit sign prefixes (`+` or `−`).

### Input Fields & Controls
- Form inputs feature fully rounded profiles (`rounded-xl` to pill), soft `#F8FAFC` interior fill, and a `1px` resting border (`#E2E8F0`).
- Focus state activates an outline ring of `#0D9488` with a 2px offset.
- Checkboxes and toggles employ organic transitions: toggle tracks are soft rounded pills with crisp white circular thumbs elevated by Level 1 ambient shadows.

### Specialized Financial Components
- **Budget Meter**: Dual-tone segmented horizontal pill showing current consumption against calendar month progression.
- **Smart Insight Banner**: Subtle tinted background (`#0D9488` at 8% opacity) with `rounded-2xl`, showcasing proactive AI/algorithmic financial tips with an accompanying high-contrast icon.