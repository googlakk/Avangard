# Design System 2.0 & UI Specification

**Version:** 2.1 (Main Page Aligned)
**Status:** PROD
**Enforcement:** MANDATORY for all Agents

This document is the **Single Source of Truth**, strictly derived from the Main Page (`app/page.tsx`).

---

## 1. Typography & Fonts

The site uses a mix of 5 specific fonts. Agents must use the correct font for the correct context.

> **NEW (2026-01-26):** **Cinzel** font added to match the INTELLECT INTERNATIONAL SCHOOL logo's classic Trajan-style typography.

| Font Name | Logic / Variable | Tailwind Class / Usage | Context |
|-----------|------------------|------------------------|---------|
| **Cinzel** | `var(--font-cinzel)` | `font-display` | **Primary Display Headings** - Main page titles, H1 elements. Matches logo's classic Roman serif style. |
| **IBM Plex Serif** | `var(--font-ibm-plex-serif)` | `font-[family-name:var(--font-ibm-plex-serif)]` | **Hero Numbers** (e.g. "2016", "1000+"), **Big Academic Titles**. |
| **Cormorant Garamond** | `var(--font-cormorant)` | `font-[family-name:var(--font-cormorant)]` | **Elegant Subtitles** (e.g. "Founded", "Students"). Often paired with `tracking-wider`. |
| **Montserrat** | `var(--font-montserrat)` | `font-heading` | **Section Headings** (e.g. "Philosophy", "Programs"). Standard Bold headers. |
| **Inter** | `var(--font-inter)` | `font-sans` | **Body Text**, Buttons, UI Elements. |

### ⚠️ Typography Rules
1. **NEW: Logo-Matching Headers** - Use **Cinzel** (`font-display`) for main page titles and H1 elements to maintain brand consistency with the INTELLECT INTERNATIONAL SCHOOL logo's Trajan style.
2. **DO NOT** use generic `font-serif` unless you specifically want the browser default. Use the specific variable classes above for the "Premium" look.
3. **Hero/Display Size:** Use `text-5xl` (desktop) / `text-4xl` (mobile) for stats.
4. **Section Headings:** Use `text-3xl md:text-4xl font-bold font-display` (Cinzel) for major headings OR `font-heading` (Montserrat) for standard section headers.
5. **Subtitles:** Use `text-xs uppercase tracking-[0.3em]` (seen in Programs section) OR `text-2xl font-semibold` (seen in Hero stats labels).

---

## 2. Color Palette (Strict)
Derived from `tailwind.config.ts` and `globals.css`.

| Token | Class | Hex | Usage |
|-------|-------|-----|-------|
| **Navy 900** | `bg-navy-900` | `#0B1B3D` | Primary Brand Color. Buttons, Background accents. |
| **Navy 900 (Opacity)** | `text-navy-900/60` | | Subtitles (e.g. "ECOSYSTEM OF DEVELOPMENT"). |
| **White** | `bg-white` | `#FFFFFF` | Cards, Section backgrounds. |
| **Gray 50** | `bg-gray-50` | `#f9fafb` | Alternating section backgrounds. |
| **Glass Effect** | `bg-white/10` | | Used in Hero overlay cards. |

**Glassmorphism Recipe (Hero/Floating Elements):**
```tsx
className="bg-white/10 backdrop-blur-xl border border-white"
```

---

## 3. Component Specs (Extracted from Code)

### 🔘 Buttons
**Location:** `components/ui/Button.tsx`

```tsx
// Primary
className="bg-navy-900 text-white hover:bg-navy-800 rounded-full px-8 py-3 font-medium hover:shadow-lg transition-all"
```
*Note: Always use `rounded-full`.*

### 🃏 Program Cards (ProjectsSection)
**Location:** `components/sections/ProjectsSection.tsx`

```tsx
<div className="bg-gray-100 rounded-2xl p-3 pb-6 shadow-sm group">
  {/* Image Container */}
  <div className="relative mb-4 overflow-hidden rounded-xl aspect-[5/3]">
    <Image className="transition-transform duration-500 group-hover:-translate-y-[40%]" />
    {/* Description Reveal on Hover */}
    <div className="absolute bottom-0 ... opacity-0 group-hover:opacity-100">...</div>
  </div>
  {/* Texts */}
  <h3 className="text-base font-bold text-gray-900">Title</h3>
</div>
```

### 📰 Philosophy Cards (NewsSection)
**Location:** `components/sections/NewsSection.tsx`

```tsx
<div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
  <div className="relative h-48 overflow-hidden">
     <Image className="group-hover:scale-110" />
     <Badge />
  </div>
  <div className="p-6">
    <h3 className="text-xl font-bold font-heading text-gray-900">Title</h3>
  </div>
</div>
```

---

## 4. Spacing Strategy
- **Container:** `container mx-auto px-4` (Used everywhere).
- **Section Vertical:** `py-16` (standard) or `py-8 md:py-12` (compact).
- **Grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.

## 5. Animation
- **Fade In Up:** `animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]` (Custom manual class usage seen in ProjectsSection).
- **Standard Fade:** `animate-fade-in` (from config).
