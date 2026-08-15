---
description: Specific workflow for Avangard Intellect to redesign UI components without breaking layouts or multi-language support.
---

# Avangard Intellect UI Redesign Workflow

Use this workflow whenever updating or redesigning UI components for the Avangard Intellect website. It ensures that the "Academic Luxury" design system is maintained and prevents common layout bugs across different viewports and languages (English and Russian).

## 1. Context & Design Analysis
- **Goal:** Maintain the "Modern Premium + Academic Luxury" aesthetic.
- **Reference:** Check `docs/DESIGN_SYSTEM.md` or `aesthetic_standards.md` from the Knowledge Items.
- **Action:** Before writing code, analyze the structure of the section. Identify if the component needs a grid, flexbox, or absolute positioning.

## 2. Multi-Language Layout Rules (CRITICAL)
- **Problem:** Russian text is typically 20-30% longer than English text, which often causes text wrapping, overlap, or broken margins ("полетели отступы").
- **Rule 1 (Dynamic Heights):** Never hardcode heights (e.g., `h-64`) on cards containing text. Use `h-full` on the card container and `flex-grow` on the inner text container so it stretches naturally.
- **Rule 2 (Flex Alignment):** Always use `flex flex-col h-full` on grid items. For elements that need to stick to the bottom (like Badges or Buttons), use `mt-auto`.
- **Rule 3 (Icon Constraints):** Do not wrap `IconWrapper` components in fixed-size containers (like `w-10 h-10`) if the icon size itself is controlled by the component (`size="sm"` or `size="md"`). This prevents the icon from overflowing and overlapping the title.

## 3. Implementation Steps
1. **Apply Design Tokens:** Use the predefined Tailwind classes (e.g., `bg-[#001d3d]`, `text-[#00c6ff]`). Do not invent new colors unless approved.
2. **Structural Updates:** Refactor old block layouts into responsive Flexbox/Grid layouts (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
3. **Typography:** Ensure `font-heading` is used for titles and `font-manrope` or `font-sans` for body text.

## 4. Verification & Testing
- **Action:** After implementation, you MUST verify the UI.
- **Test Both Locales:** Check both `/en/` and `/ru/` versions of the page.
- **Device Check:** Ensure the layout does not break on mobile (`max-width: 768px`) or desktop.
- **Cache Clearing:** If Next.js throws Hydration Errors or layout styles do not update, delete the `.next` folder and restart the dev server.
